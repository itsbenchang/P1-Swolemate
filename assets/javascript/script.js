

$('button').mouseup(function() { this.blur() })

$(function () {
    var splash = $('.splash');
    var backgrounds = [
      'url(assets/images/buddylift.jpg)', 
      'url(assets/images/buddyrun.jpg)',
      'url(assets/images/buddysit.jpg)',
      'url(assets/images/groupfitness.jpg)'];
    var current = 0;

    function nextBackground() {
        splash.css(
            'background-image',
        backgrounds[current = ++current % backgrounds.length]);

        setTimeout(nextBackground, 5000);
    }
    setTimeout(nextBackground, 5000);
    splash.css('background-image', backgrounds[0]);
});

// Firebase 

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyDxQ4YEmF_TY6huoWtT67y2Xj7Gw-0hyoM",
   authDomain: "swolemate-e6470.firebaseapp.com",
   databaseURL: "https://swolemate-e6470.firebaseio.com",
   storageBucket: "swolemate-e6470.appspot.com",
   messagingSenderId: "771999306115"
 };

 firebase.initializeApp(config);


 function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('login-button').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      document.getElementById('login-button').disabled = true;
    }


    function handleSignUp() {
      var email = document.getElementById('email-signup').value;
      var password = document.getElementById('password-signup').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }

    function sendPasswordReset() {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }

    var auth = firebase.auth().currentUser;
    var storageRef = firebase.storage().ref();

    function handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      var file = evt.target.files[0];
      var metadata = {
        'contentType': file.type
      };
      // Push to child path.
      // [START oncomplete]
      storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log(snapshot.metadata);
        var url = snapshot.downloadURL;
        console.log('File available at', url);
        // [START_EXCLUDE]
        // [END_EXCLUDE]
        $("#image-profile").attr("src", url);
      }).catch(function(error) {
        // [START onfailure]
        console.error('Upload failed:', error);
        // [END onfailure]
      });
      user.updateProfile({
      photoURL: url
      }).then(function() {
      // Update successful.
      }, function(error) {
      // An error happened.
      });
      // [END oncomplete]
}


function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        // document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;


          firebase.database().ref().child("/users").child(uid).update({
            displayName : displayName,
            email : email,
            photoURL : photoURL,
          });
          
          firebase.database().ref().child("/users").child(uid);

          firebase.database().ref().child(uid).once('value', function(snapshot) {
            
            // ...
          });
          // [START_EXCLUDE]
          //document.getElementById('login-button').textContent = 'Sign out';
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          //document.getElementById('login-button').textContent = 'Log in';
          // document.getElementById('quickstart-account-details').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        //document.getElementById('login-button').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      // document.getElementById('submit-login').addEventListener('click', toggleSignIn, false);
      // document.getElementById('submit-signup').addEventListener('click', handleSignUp, false);
      //document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }
    window.onload = function() {
      initApp();
      document.getElementById('file').addEventListener('change', handleFileSelect, false);
    };


$("#login-button").on("click", function(){
	$("#login").css("display", "block");
	$("#login").css("width", "auto");
	$("#signup-button").prop("disabled",true);
	firebase.auth().onAuthStateChanged(user => {
    if(user) {
      window.location = 'profile.html';
      }
    });
});

$("#signup-button").on("click", function(){
	$("#signup").css("display", "block");
	$("#signup").css("width", "auto");
});

$("#submit-login").on("click", function(){
	firebase.auth().onAuthStateChanged(user => {
    if(user) {
      window.location = 'profile.html';
      }
    });
	console.log("click login");
	toggleSignIn();
});

$("#submit-signup").on("click", function(){
  console.log("click signup");
  handleSignUp();
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      window.location = 'settings.html';
      }
    });

});

$("#sign-out").on("click", function(){
      if (firebase.auth().currentUser) {
        // [START signout]
        console.log("click");
        firebase.auth().signOut();
        window.location = 'index.html';
        // [END signout]
      }

});

$("#profile").click(function(){
        window.location = 'profile.html';
        console.log("profile");
});

$("#explore").click(function(){
        window.location = 'explore.html';
});

$("#message").click(function(){
        window.location = 'chat.html';
});

$("#setting").click(function(){
        window.location = 'settings.html';
        console.log("profile");
});

$("#save-settings").click(function(){
  event.preventDefault();
  name = $("#name-input").val().trim();
  email = $("#email-input").val().trim();
  age = $("#age-input").val().trim();
  comment = $("#comment-input").val().trim();
});


// $(document).ready(function() {
    
//     var readURL = function(input) {
//         if (input.files && input.files[0]) {
//             var reader = new FileReader();

//             reader.onload = function (e) {
//                 $('.profile-pic').attr('src', e.target.result);
//             }
//             reader.readAsDataURL(input.files[0]);
//         }
//     }
    

//     $(".file-upload").on('change', function(){
//         readURL(this);
//     });
    
//     // $(".upload-button").on('click', function() {
//     //    $(".file-upload").click();
//     // });
// });


