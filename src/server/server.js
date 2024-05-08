import express from "express";
import logger from "morgan";
<<<<<<< HEAD
import * as db from "./db.js";

const headerFields = { "Content-Type": "text/html" };

async function createCartItem(response, name) {
  if (name === undefined) {

  } else {
    try {
    } catch (err) {
    }
  }
}

async function readCartItem(response, name) {
  try {

  } catch (err) {
    
  }
}

async function updateCartItem(response, name) {
  try {

  } catch (err) {

  }
}

async function deleteCartItem(response, name) {
  try {

  } catch (err) {

  }
}

async function dumpCartItems(response) {
    try {
        
    } catch (err) {
      
    }
  }
  

const app = express();
const port = 3260;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("src/client"));

const methodNotAllowedHandler = async (request, response) => {
  response.status(405).type('text/plain').send('Method Not Allowed');
};

app
  .route("/read")
  .get(async (request, response) => {
    const options = request.query;
    readCartItem(response, options.name);
  })
  .all(methodNotAllowedHandler);

// TASK #3: Handle the other request routes
app
  .route("/create")
  .post(async (request, response) => {
    const options = request.query;
    createCartItem(response, options.name);
  })
  .all(methodNotAllowedHandler);

app
  .route("/update")
  .put(async (request, response) => {
    const options = request.query;
    updateCartItem(response, options.name);
  })
  .all(methodNotAllowedHandler);

app
  .route("/delete")
  .delete(async (request, response) => {
    const options = request.query;
    deleteCartItem(response, options.name);
  })
  .all(methodNotAllowedHandler);

// this should always be the last route
app.route("*").all(async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
=======
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



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

>>>>>>> 6e1df37db27dc2e992f7e73afed6d01677a294b6
