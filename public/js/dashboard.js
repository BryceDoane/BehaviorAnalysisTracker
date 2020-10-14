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

  n =  new Date();
  y = n.getFullYear();
  m = n.getMonth() + 1;
  d = n.getDate();
  document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
  //current date script by Lance on StackOverflow

var uid;
var userEmail;
var classes = [];
var tasks = [];

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    uid = user.uid;
    email = user.email;
    console.log(uid);
  } else {
    // No user is signed in.
    window.location = "http://behavior-analysis-tracker.web.app/index.html";
  }
});

//Create table
var mountains = [];

function generateClassesTable(mountains) {

  let table = document.querySelector("table");
  let data = Object.keys(mountains[0]);
  generateTable(table, mountains);
  generateTableHead(table, data);
  
  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
  mountains = [];
}

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
  });
  for (i = 0; i < (classes.length / 2); i++) {
    var td = document.createElement('TABLE');
    document.getElementById("classNameLi").appendChild(td);
    mountains = [
      { StudentName: "Bryce", Bring_Pencils: 1, Bring_Homework: 1, Task4: 3, task3: 9 },
      { name: "Gage", task1: 4, task2: 5, task3: 3, task4: 6 },
      { name: "Matt", task1: 2, task2: 2, task3: 3, task4: 6  },
      { name: "Eddie", task1: 5, task2: 3, task3: 3, task4: 6  },
      { name: "Pat", task1: 3, task2: 4, task3: 3, task4: 6  }
    ];
  
  }

  generateClassesTable(mountains);
});

//log out functionality on top right
function signout(){firebase.auth().signOut();
  alert("signed out");};
const sout = document.getElementById("lout");
sout.addEventListener('click', signout);

//gets signed in user
firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {
    document.getElementById("linu").innerHTML = user.email;
  } else {
    document.getElementById("linu").innerHTML = user.email;
  }
})