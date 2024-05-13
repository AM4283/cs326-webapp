# cs326-webapp
StyleScout 360 - By Albi Marini, Nicole Kaldus, Danny Cedrone & Nathan Pearce

Team 20 submission of the semester project for CS 326 Web Programming @ UMass

## Mission
The goal of this web app is to solve the longstanding issue that many avid online shoppers encounter today when shopping for clothes - trying to find the right styles at the best price without having to scour many different websites.


## PROJECT STRUCTURE
client/: Contains the front-end code.
    index.html: The main HTML file.
    styles.css: CSS file for styling.
    script.js: JavaScript file for managing navigation and interactions.
    CartView.js: JavaScript class for managing the cart view.
    HomeView.js: JavaScript class for managing the home view.
    searchResultsView.js: JavaScript class for managing search results.
    user-info.js: JavaScript file for managing user authentication and account details.
server/: Contains the back-end code.
    server.js: The main server file.
    database.js: Database connection and management file.


## HOW TO RUN
Install Dependencies: Run npm install to install the required dependencies.
Start the Server: Run npm run start to start the server.
Access the Application: Open your browser and go to http://localhost:3000.


## TECHNOLOGIES USED
Front-end: HTML, CSS, JavaScript, Bootstrap
Back-end: Node.js, Express.js
Database: PouchDB
Others: LocalStorage for client-side data management



## API ROUTES

## User Authentication

POST /api/login
Description: Authenticates a user by checking their credentials.
Request Body:
{
  "username": "string",
  "password": "string"
}
Responses:
    200 OK: { "success": true } if credentials are correct.
    404 Not Found: { "success": false, "message": "Username not found" } if the username does not exist.
    500 Internal Server Error: { "success": false, "message": "Internal server error: <error message>" } for other errors.


POST /api/create_account
Description: Creates a new user account with the provided username and password.
Request Body:
{
  "username": "string",
  "password": "string"
}
Responses:
    200 OK: { "success": true } if the account is created successfully.
    500 Internal Server Error: { "success": false, "message": "Internal server error: <error message>" } if an account with the same username already exists or other errors.


POST /api/logout
Description: Logs out the current user.
Responses:
    200 OK: { "success": true }



## Cart Management

POST /api/add_to_cart
Description: Adds an item to the user's cart.
Request Body:
{
  "id": "string",
  "product": "string",
  "user": "string",
  "img": "string",
  "price": "number",
  "store": "string",
  "link": "string",
  "quantity": "number"
}
Responses:
    200 OK: { "success": true } if the item is added successfully.
    500 Internal Server Error: { "success": false, "message": "Internal server error: <error message>" } for other errors.


GET /api/load_cart
Description: Loads the user's cart items.
Query Parameters:
    user: The username of the logged-in user.
Responses:
    200 OK: { "success": true, "userCart": <cart items> } if the cart is loaded successfully.
    500 Internal Server Error: { "success": false, "message": "Internal server error: <error message>" } for other errors.


DELETE /api/delete_item
Description: Deletes an item from the user's cart.
Query Parameters:
    id: The ID of the cart item to be deleted.
Responses:
    200 OK: { "success": true } if the item is deleted successfully.
    500 Internal Server Error: { "success": false, "message": "Internal server error: <error message>" } for other errors.


PUT /api/update_quantity
Description: Updates the quantity of an item in the user's cart.
Query Parameters:
    id: The ID of the cart item.
    quantity: The new quantity for the cart item.
Responses:
    200 OK: { "success": true, "deleted": <boolean> } if the quantity is updated successfully.
    500 Internal Server Error: { "success": false, "message": "Internal server error: <error message>" } for other errors.


GET /api/get_quantity
Description: Gets the quantity of an item in the user's cart.
Query Parameters:
    id: The ID of the cart item.
Responses:
    200 OK: { "success": true, "quantity": <number> } if the quantity is retrieved successfully.
    500 Internal Server Error: { "success": false, "message": "Internal server error: <error message>" } for other errors.
