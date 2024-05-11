import express from "express";
import logger from "morgan";
import db from "./database.js";
import path from "path";
import { fileURLToPath } from 'url';
// const db = require('./database.js');

const textHeader = { "Content-Type": "text/html" };

const app = express();
const port = 3000;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static("src/client"));
// app.use(express.static(path.join(__dirname, '../client')));
// app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../client')));
// app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), '../client')));

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const userDoc = await db.get(username); // Assuming 'get' fetches user data by username
      if (userDoc && userDoc.password === password) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
    //   console.error("Login error:", error);
    //   res.status(500).json({ success: false, message: "Internal server error" });
      if (error.name === 'not_found') {
        res.status(404).json({ success: false, message: "Username not found" });
        console.log(`User: ${username} not found`);
      } else {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error: " + error.message });
      }
    }
  });

app.post('/api/create_account', async (req, res) => {
    const { username, password } = req.body;
    try {
      await db.put({
        _id: username,
        password: password
      });
       res.json({ success: true });
    //   localStorage.setItem("currentUser", username);
    //   updateAuthUI();
    //   console.log("Account created successfully");
    } catch (error) {
      console.error("Account creation failed:", error);
      res.status(500).json({ success: false, message: "Internal server error: " + error.message });
    //   alert("Failed to create account. Please try again.");
    }
});

app.post('/api/logout', (req, res) => {
    res.json({ success: true});
})

app.post('/api/add_to_cart', async (req, res) => {
  const { id, product, user, img, price, store, link, quantity } = req.body;
  try {
    await db.put({
      _id: id,
      product: product,
      user: user,
      img: img,
      price: price,
      store: store,
      link: link,
      quantity: quantity
    });
    if(db.get(id)) {
      res.json({ success: true });
      console.log(`added to cart: ${id}`);
    }
  } catch (error) {
    console.error("Error adding this item to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error: " + error.message });
  }
});

app.get('/api/load_cart', async (req, res) => {
  console.log("getting user cart");
  const user = req.query.user;
  console.log(`inside load_cart: user is ${user}`);
  try{
    const userCart = await db.allDocs({
      include_docs: true,
      startkey: user + '_cart_',
      endkey: user + "_cart_\uffff"
    });
    res.status(200).json({ success: true, userCart: userCart });
  }
  catch(err) {
    console.log("error in load_cart");
    res.status(500).json({ success: false, message: "Internal server error: " + err.message });
  }
});

app.delete('/api/delete_item', async (req, res) => {
  console.log("deleting item");
  const id = req.query.id;
  console.log(id);
    try {
      db.get(id).then(function(doc) {
        return db.remove(doc);
      }).catch(function (err) {
        console.log(err);
      });
      console.log('removed from cart');
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error removing this item from cart:", error);
      res.status(500).json({ success: false, message: "Internal server error: " + error.message });
    }
});

app.put('/api/update_quantity', async (req, res) => {
  const type = req.query.type;
  const id = req.query.id;
  console.log(`type: ${type} and id: ${id}`);
  let deleted = false;
  try {
    if(type == "increase") {
      db.get(id).then(function(doc) {
        const quantity = doc.quantity+1;
        console.log(`increased quantity to ${quantity}`);
        return db.put({
          _id: id,
          _rev: doc._rev,
          quantity: quantity
        });
      })
    } else if(type == "decrease") {
      await db.get(id).then(async function(doc) {
        const quantity = doc.quantity-1;
        console.log(`decreased quantity to ${quantity}`);
        if(quantity == 0) {
          await db.get(id).then(async function(doc) {
            return await db.remove(doc);
          }).catch(function (err) {
            console.log(err);
          });
          console.log('removed from cart');
          deleted = true;
        }
        else{
          return db.put({
            _id: id,
            _rev: doc._rev,
            quantity: quantity,
            product: doc.product,
            user: doc.user,
            img: doc.img,
            price: doc.price,
            store: doc.store,
            link: doc.link
          });
        }
      })
    }
    console.log('server: quantity updated');
    res.status(200).json({ success: true, deleted: deleted });
  } catch (e) {
    console.error("Error updating this item:", e);
    res.status(500).json({ success: false, message: "Internal server error: " + e.message });
  }
  
});

app.get('/api/get_quantity', async (req, res) => {
  const id = req.query.id;
  try {
    const quantity = await db.get(id).then(function(doc) {
      return doc.quantity;
    })
    console.log(`quantity: ${quantity}`);
    res.status(200).json({ success: true, quantity: quantity });
  } catch (e) {
    console.error("Error fetching this item:", error);
    res.status(500).json({ success: false, message: "Internal server error: " + e.message });
  }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

