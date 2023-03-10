// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC-qMbLn8NpEVZD-ZYf9aW6Aa3p3thMY9w",
    authDomain: "login-form-41477.firebaseapp.com",
    projectId: "login-form-41477",
    storageBucket: "login-form-41477.appspot.com",
    messagingSenderId: "260585260840",
    appId: "1:260585260840:web:44eba2bf97f4a57ba9b21d"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
var auth = firebase.auth()
var database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  first_name = document.getElementById('first_name').value
  last_name = document.getElementById('last_name').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(first_name) == false || validate_field(last_name) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }


  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(() => {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      first_name : first_name,
      last_name : last_name,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created')
    
  })
  .catch((error) => {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
  
  
}


// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

