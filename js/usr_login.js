// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Toggle between forms
function toggleForm() {
  document.getElementById("login-form").style.display =
    document.getElementById("login-form").style.display === "none" ? "block" : "none";
  document.getElementById("register-form").style.display =
    document.getElementById("register-form").style.display === "none" ? "block" : "none";
}

// Register New User
function register() {
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      userCredential.user.updateProfile({
        displayName: name
      });
      alert("Registered successfully!");
      showProfile(userCredential.user);
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Login User
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Login successful!");
      showProfile(userCredential.user);
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}

// Logout
function logout() {
  auth.signOut().then(() => {
    document.getElementById("auth-container").style.display = "block";
    document.getElementById("profile").style.display = "none";
  });
}

// Show User Profile
function showProfile(user) {
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("profile").style.display = "block";
  document.getElementById("user-name").innerText = user.displayName;
  document.getElementById("user-email").innerText = user.email;
}

// Auto login if session exists
auth.onAuthStateChanged((user) => {
  if (user) {
    showProfile(user);
  }
});
