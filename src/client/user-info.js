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
  document
    .getElementById("signInBtn")
    .addEventListener("click", async function () {
      displaySignInForm();
    });
  document
    .getElementById("createAccountBtn")
    .addEventListener("click", function () {
      displayCreateAccountForm();
    });
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
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem("currentUser", username);
    updateAuthUI();
  } else {
    alert("Login failed: " + data.message);
    // console.error(data.message);
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
  const response = await fetch("/api/create_account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem("currentUser", username);
    updateAuthUI();
    if (DEBUG) console.log("Account created successfully");
  } else {
    alert("Create account failed: " + data.message);
    // console.error(data.message);
  }
}

document.getElementById("signOutBtn").addEventListener("click", signOut);

/**
 * Attempts to sign a logged-in user out.
 * @async
 * @function signOut
 */
async function signOut() {
  const response = await fetch("/api/logout", {
    method: "POST",
  });
  const data = await response.json();
  if (data.success) {
    localStorage.removeItem("currentUser");
    updateAuthUI();
  } else {
    alert("Logout failed");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateAuthUI();
});