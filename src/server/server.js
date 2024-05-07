import express from "express";
import logger from "morgan";
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
    const counter = await db.loadCounter(name);
    counter.count++;
    await db.modifyCounter(counter);
    response.writeHead(200, headerFields);
    response.write(`<h1>Counter ${counter._id} Updated</h1>`);
    response.end();
  } catch (err) {
    response.writeHead(404, headerFields);
    response.write(`<h1>Counter ${name} Not Found</h1>`);
    response.end();
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
