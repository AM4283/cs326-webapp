import express from "express";
import logger from "morgan";
import db from "./database.js";

const app = express();
const port = 3000;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/client"));

/**
 * POST /api/login
 * Login functionality to check user credentials.
 * @param {express.Request} req - The request object containing all the HTTP data.
 * @param {express.Response} res - The response object used for sending back HTTP responses.
 */
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const userDoc = await db.get(username);
      if (userDoc && userDoc.password === password) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      if (error.name === 'not_found') {
        res.status(404).json({ success: false, message: "Username not found" });
      } else {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }
  });

/**
 * POST /api/logout
 * Logout functionality to clear user session.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.post('/api/logout', (req, res) => {
    res.json({ success: true });
});

app.post("/api/logout", (req, res) => {
  res.json({ success: true });
});

app.post("/api/add_to_cart", async (req, res) => {
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
      quantity: quantity,
    });
    if (db.get(id)) {
      res.json({ success: true });
      console.log(`added to cart: ${id}`);
    }
  } catch (error) {
    console.error("Error adding this item to cart:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error: " + error.message,
      });
  }
});

app.get("/api/load_cart", async (req, res) => {
  console.log("getting user cart");
  const user = req.query.user;
  console.log(`inside load_cart: user is ${user}`);
  try {
    const userCart = await db.allDocs({
      include_docs: true,
      startkey: user + "_cart_",
      endkey: user + "_cart_\uffff",
    });
    res.status(200).json({ success: true, userCart: userCart });
  } catch (err) {
    console.error("error in load_cart " + err);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error: " + err.message,
      });
  }
});

app.delete("/api/delete_item", async (req, res) => {
  console.log("deleting item");
  const id = req.query.id;
  console.log(id);
  try {
    db.get(id)
      .then(function (doc) {
        return db.remove(doc);
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log("removed from cart");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error removing this item from cart:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error: " + error.message,
      });
  }
});

app.put("/api/update_quantity", async (req, res) => {
  const id = req.query.id;
  const quantity = req.query.quantity;
  console.log(`id: ${id} quantity: ${quantity}`);
  let deleted = false;
  try {
    let item = db.get(id);
    item.quantity = quantity;
    console.log("updating this: ");
    console.log(item);
    db.put(item);
    console.log("server: quantity updated");
    res.status(200).json({ success: true, deleted: deleted });
    res.end();
  } catch (e) {
    console.error("Error updating this item:", e);
    res
      .status(500)
      .json({ success: false, message: "Internal server error: " + e.message });
    res.end();
  }
});

app.get("/api/get_quantity", async (req, res) => {
  const id = req.query.id;
  try {
    const quantity = await db.get(id).then(function (doc) {
      return doc.quantity;
    });
    console.log(`quantity: ${quantity}`);
    res.status(200).json({ success: true, quantity: quantity });
  } catch (e) {
    console.error("Error fetching this item:", e);
    res
      .status(500)
      .json({ success: false, message: "Internal server error: " + e.message });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

