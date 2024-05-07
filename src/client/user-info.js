/**
 * Adds a document to the database.
 * @async
 * @function addDocument
 * @param {Object} doc - The document to be added.
 */
async function addDocument(doc) {
  try {
    const response = await db.put(doc);
    console.log("Document created successfully", response);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Retrieves a document from the database by its ID.
 * @async
 * @function getDocument
 * @param {string} id - The ID of the document to retrieve.
 */
async function getDocument(id) {
  try {
    const doc = await db.get(id);
    console.log(doc);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Synchronizes the local database with the remote database.
 * @async
 * @function syncDatabase
 */
async function syncDatabase() {
  try {
    await PouchDB.sync("my_database", "<http://example.com/mydb>");
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Sync error:", error);
  }
}

/**
 * Updates the authentication UI based on the user's sign-in status.
 * @function updateAuthUI
 */
function updateAuthUI() {
  const userAuthSection = document.getElementById("user-auth-section");
  // Check if user is signed in (this example uses localStorage for simplicity)
  const user = localStorage.getItem("currentUser");
  if (user) {
    userAuthSection.innerHTML = `<span>Hello, ${user}</span>`;
    // Show authenticated user options
    document.getElementById("accountMenu").classList.remove("d-none");
  } else {
    userAuthSection.innerHTML = `
        <button id="signInBtn" class="btn btn-primary">Sign In</button>
        <button id="createAccountBtn" class="btn btn-secondary">Create Account</button>
      `;
    // hide auth user options
    document.getElementById("accountMenu").classList.add("d-none");
    addAuthEventListeners();
  }
}

/**
 * Adds event listeners for authentication buttons.
 * @function addAuthEventListeners
 */
function addAuthEventListeners() {
  document.getElementById("signInBtn").addEventListener("click", async function() {
    displaySignInForm();
    // const username = document.getElementById("signInUsername").value;
    // const password = document.getElementById("signInPassword").value;
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ username, password })
    // });
    // const data = await response.json();
    // if (data.success) {
    //   localStorage.setItem("currentUser", username);
    //   updateAuthUI();
    // } else {
    //   alert("Login failed");
    // }
  });
  document
    .getElementById("createAccountBtn")
    .addEventListener("click", function () {
      displayCreateAccountForm();
    });
}

/**
 * Signs out the current user and updates the UI.
 * @function signOut
 */
function signOut() {
  localStorage.removeItem("currentUser");
  updateAuthUI();
}

/**
 * Displays the sign-in form.
 * @function displaySignInForm
 */
function displaySignInForm() {
  const userAuthSection = document.getElementById("user-auth-section");
  userAuthSection.innerHTML = `
    <input type="text" id="signInUsername" placeholder="Username">
    <input type="password" id="signInPassword" placeholder="Password">
    <button id="signInSubmit" class="btn btn-success">Sign In</button>
  `;
  document.getElementById("signInSubmit").addEventListener("click", signIn);
}

/**
 * Displays the create account form.
 * @function displayCreateAccountForm
 */
function displayCreateAccountForm() {
  const userAuthSection = document.getElementById("user-auth-section");
  userAuthSection.innerHTML = `
    <input type="text" id="createAccountUsername" placeholder="Username">
    <input type="password" id="createAccountPassword" placeholder="Password">
    <button id="createAccountSubmit" class="btn btn-success">Create Account</button>
  `;
  document
    .getElementById("createAccountSubmit")
    .addEventListener("click", createAccount);
}

/**
 * Attempts to sign in a user with provided credentials.
 * @async
 * @function signIn
 */
async function signIn() {
  const username = document.getElementById("signInUsername").value;
  const password = document.getElementById("signInPassword").value;
  // try {
  //   const userDoc = await db.get(username);
  //   if (userDoc.password === password) {
  //     localStorage.setItem("currentUser", username);
  //     updateAuthUI();
  //   } else {
  //     alert("Incorrect username or password.");
  //   }
  // } catch (error) {
  //   console.error(error);
  //   alert("An error occurred during sign in.");
  // }
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("currentUser", username);
      updateAuthUI();
    } else {
      alert("Login failed: " + data.message);
      console.log(data.message);
    }
}

/**
 * Attempts to create a new user account with provided credentials.
 * @async
 * @function createAccount
 */
async function createAccount() {
  const username = document.getElementById("createAccountUsername").value;
  const password = document.getElementById("createAccountPassword").value;
    const response = await fetch('/api/create_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("currentUser", username);
      updateAuthUI();
      console.log("Account created successfully");
    } else {
      alert("Create account failed: " + data.message);
      // console.error(data.message);
    }
  // try {
  //   await db.put({
  //     _id: username,
  //     password: password
  //   });
  //   localStorage.setItem("currentUser", username);
  //   updateAuthUI();
  //   console.log("Account created successfully");
  // } catch (error) {
  //   console.error("Account creation failed:", error);
  //   alert("Failed to create account. Please try again.");
  // }
}
document.getElementById("signOutBtn").addEventListener("click", async function() {
  const response = await fetch('/api/logout', {
    method: 'POST'
  });
  const data = await response.json();
  if (data.success) {
    localStorage.removeItem("currentUser");
    updateAuthUI();
  } else {
    alert("Logout failed");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  updateAuthUI();
});
