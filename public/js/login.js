  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB9Y2gGnOUC9tG_4piaqqCEhMxdi5yxQDI",
    authDomain: "behavior-analysis-tracker.firebaseapp.com",
    databaseURL: "https://behavior-analysis-tracker.firebaseio.com",
    projectId: "behavior-analysis-tracker",
    storageBucket: "behavior-analysis-tracker.appspot.com",
    messagingSenderId: "392015561610",
    appId: "1:392015561610:web:d9d2686cb3c9b312e4fe73",
    measurementId: "G-EM4XVKW2YS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  auth.signOut();
 
//Signs In User
function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
<<<<<<< HEAD
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

}
=======
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).catch(e => alert(e.message));
>>>>>>> 67275c8f1bc926e6f551989d3a813b2b66f916df

    //Checks If Auth Status has changed
var user = promise;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    console.log(signIn);
  } else {
    console.log('not logged');
    // No user is signed in.
  }
});
    

   
  