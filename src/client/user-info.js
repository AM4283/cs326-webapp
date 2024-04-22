// import db from './index.html';

async function addDocument(doc) {
    try {
      const response = await db.put(doc);
      console.log("Document created successfully", response);
    } catch (error) {
      console.error(error);
    }
  }
  
//   addDocument({ _id: 'unique_document_id', data: { /* your data here */ } });

async function getDocument(id) {
  try {
    const doc = await db.get(id);
    console.log(doc);
  } catch (error) {
    console.error(error);
  }
}
  
//   getDocument('unique_document_id');

async function syncDatabase() {
  try {
    await PouchDB.sync('my_database', '<http://example.com/mydb>');
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Sync error:', error);
  }
}
  
//   syncDatabase();
  
  function updateAuthUI() {
    const userAuthSection = document.getElementById('user-auth-section');
    // Check if user is signed in (this example uses localStorage for simplicity)
    const user = localStorage.getItem('currentUser');
    if (user) {
      userAuthSection.innerHTML = `<span>Hello, ${user}</span>`;
      // Show authenticated user options
      document.getElementById('accountMenu').classList.remove('d-none');
    } else {
      userAuthSection.innerHTML = `
        <button id="signInBtn" class="btn btn-primary">Sign In</button>
        <button id="createAccountBtn" class="btn btn-secondary">Create Account</button>
      `;
      // hide auth user options
      document.getElementById('accountMenu').classList.add('d-none');
      addAuthEventListeners();
    }
  }
  
  function addAuthEventListeners() {
    document.getElementById('signInBtn').addEventListener('click', function() {
      displaySignInForm();
    });
    document.getElementById('createAccountBtn').addEventListener('click', function() {
      displayCreateAccountForm();
    });
  }
  
  // Simplified sign-in and account creation functions
  // Implement actual database checks and updates here using PouchDB
  
  // Example sign-out function
  function signOut() {
    localStorage.removeItem('currentUser');
    updateAuthUI();
  }

function displaySignInForm() {
  const userAuthSection = document.getElementById('user-auth-section');
  userAuthSection.innerHTML = `
    <input type="text" id="signInUsername" placeholder="Username">
    <input type="password" id="signInPassword" placeholder="Password">
    <button id="signInSubmit" class="btn btn-success">Sign In</button>
  `;
  document.getElementById('signInSubmit').addEventListener('click', signIn);
}

function displayCreateAccountForm() {
  const userAuthSection = document.getElementById('user-auth-section');
  userAuthSection.innerHTML = `
    <input type="text" id="createAccountUsername" placeholder="Username">
    <input type="password" id="createAccountPassword" placeholder="Password">
    <button id="createAccountSubmit" class="btn btn-success">Create Account</button>
  `;
  document.getElementById('createAccountSubmit').addEventListener('click', createAccount);
}

async function signIn() {
  const username = document.getElementById('signInUsername').value;
  const password = document.getElementById('signInPassword').value;
  try {
    const userDoc = await db.get(username);
    if (userDoc.password === password) {
      localStorage.setItem('currentUser', username);
      updateAuthUI();
    } else {
      alert('Incorrect username or password.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred during sign in.');
  }
}

async function createAccount() {
  const username = document.getElementById('createAccountUsername').value;
  const password = document.getElementById('createAccountPassword').value;
  try {
    await db.put({
      _id: username,
      password: password
    });
    localStorage.setItem('currentUser', username);
    updateAuthUI();
  } catch (error) {
    console.error(error);
    alert('An error occurred during account creation.');
  }
}
document.getElementById('signOutBtn').addEventListener('click', signOut);
document.addEventListener('DOMContentLoaded', function() {
  updateAuthUI();
});