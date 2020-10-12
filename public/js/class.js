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

// Get the modal
var classModal = document.getElementById("classModal");

// Get the button that opens the modal
var addClassbtn = document.getElementById("addClassModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
addClassbtn.onclick = function () {
  classModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  classModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == classModal) {
    classModal.style.display = "none";
  }
}

//Declare Variables
var uid;
var userEmail;
var classes = [];
var tasks = [];

//User State Listener
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    uid = user.uid;
    console.log(uid);
    userEmail = user.email;
  } else {
    // No user is signed in.
  }
});
var classAdded = false;
//Takes in class name from modal form
function newClass() {
  var className = document.getElementById("className").value;
  //var UID = user.uid;
  classModal.style.display = "none";
  firebase.database().ref('classes').push({ className: className, task: "temp", UID: uid });
  location.reload();
}

// View classes
var classesRef = firebase.database().ref('classes');
var classesList;
classesRef.on('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var childData = childSnapshot.val();
    classesRef.on('child_added', function (snapshot) {
      //Do something with the data
      //document.getElementById("classNameLi").innerHTML = childData.className;
      
    });
    classes.push(childData.className);
    classes.push(childData.Tasks);
    
    //console.log(childData.Tasks);
    //document.getElementById("classNameLi").innerHTML = ("<li>" + childData.className + "</li>");
    //console.log(classes); 

  });
  //document.getElementById("classNameLi").innerHTML = ("<li>" + classesList + "</li>");
    for (i = 0; i < classes.length; i++) {
      if (i%2 == 0){
        //console.log(classes[i]);
        var node = document.createElement("li");                 // Create a <li> node
        var textnode = document.createTextNode(classes[i]);  //Create a text node
        node.appendChild(textnode);
        document.getElementById("classNameLi").appendChild(node);
      }else {
        var taskText = classes[i];
        //taskText.flat(1);
        console.log(JSON.stringify(classes[i]));
        var node2 = document.createElement("ul");                 // Create a <li> node
        var textnode2 = document.createTextNode(JSON.stringify(classes[i]));  //Create a text node
        node2.appendChild(textnode2);
        document.getElementById("classNameLi").appendChild(node2);
      }

      /*for (j = 0; j < classes[i].length; j++){
        //console.log(classes[1]);
      }*/


    }
    //console.log(classes);
    //onsole.log(classes[1]);
});




