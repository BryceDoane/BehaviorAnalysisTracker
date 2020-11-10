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

n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
//current date script by Lance on StackOverflow

var uid;
var userEmail;
var schoolName;
var classes = [];
var students = [];
var studentsList;
var studentNames = [];
var studentNamesList;
var studentTest;
var classRef = firebase.database().ref('classes');
var taskCount = 0;

var temp = [];
var tasks = [];
var tasksID = [];
var taskList;
var dTable;
var gorger;
var gorgerr;


var formModal = document.getElementById("formModal");
var infobtn = document.getElementById("addInfoModal");
var span1 = document.getElementsByClassName("close")[0];

infobtn.onclick = function () {
  formModal.style.display = "block";
}
span1.onclick = function () {
  formModal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == formModal) {
    formModal.style.display = "none";
  }
}



firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    uid = user.uid;
    email = user.email;
    schoolName = user.displayName;
    var classRef = firebase.database().ref('Schools/' + schoolName + "/classes");
    //var studentNameRef = firebase.database().ref('Schools/' + schoolName + "/students");
    // studentNameRef.on('value', function (snapshot) {
    //   snapshot.forEach(function (childSnapshot) {
    //     var childSNData = childSnapshot.val();
    //     studentNames.push(childSNData.studentName);
    //     studentNames.push(childSNData.studentID);
    //     console.log(studentNames);
    //   });
    //   studentsNamesList = studentNames; //.toString();
    //   //console.log(studentsNamesList);
    // });
    classRef.on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childCData = childSnapshot.val();
        var taskRef = firebase.database().ref('Schools/' + schoolName + "/classes/" + childSnapshot.val().className + "/Tasks");

        temp.push("ClassName: " + childCData.className);
        temp.push(" ");

        taskRef.on('value', function (snapshot2) {
          snapshot2.forEach(function (childSnapshot2) {
            temp.push(childSnapshot2.val().taskName)
          })
        })

        var select = document.getElementById("classList")
        classes.push(childCData.className);
        //console.log(temp);
        // var studentRef = firebase.database().ref('Schools/' + "null" + "/classes" + "/Test Class 2" + '/Student List');
        // studentRef.on('value', function (snapshot) {
        //   snapshot.forEach(function (childSnapshot) {
        //     var childSData = childSnapshot.val();
        //     studentsList.push(childSData);
        //     console.log(studentsList);
        //   });
        //   //studentTest = studentsList.toString();
        //   //console.log(studentTest);
        // });
      });
      for (i = 0; i <= (temp.length - 1); i++) {
        var temp2 = temp[i];
        if (temp2.includes("ClassName")) {
          taskCount = 0;
          students = [];
          temp3 = temp2.replace('ClassName: ', "");
          var stuRef = firebase.database().ref('Schools/' + schoolName + "/classes/" + temp3 + "/Student List");
          var node = document.createElement('h1');
          var textNode = document.createTextNode(temp3);
          node.appendChild(textNode);
          document.getElementById("classNameLi").appendChild(node)
          var tablenode = document.createElement('table');
          tablenode.Id = "tableID";
          dTable = tablenode;

          let newRow = tablenode.insertRow(-1);
          // let newCell = newRow.insertCell(0);
          // let newText = document.createTextNode('');
          // newCell.appendChild(newText);
          document.getElementById("classNameLi").appendChild(tablenode);
          //classCount++;
          //console.log(classCount);

          stuRef.on('value', function (snapshot3) {
            //console.log(snapshot3.val());
            snapshot3.forEach(function (childSnapshot3) {
              students.push(childSnapshot3.val().studentName);
            })
          })
          for (j = 0; j <= (students.length - 1); j++) {
            let newRow = tablenode.insertRow(-1);
            let newCell = newRow.insertCell(0);
            let newText = document.createTextNode(students[j]);
            newCell.appendChild(newText);
            //console.log(tablenode.rows[0].cells.length);
            // var divnode = document.createElement('div');
            // divnode.id = "taskID";
            // var trNode = document.createElement('tr');
            // trNode.id = "nodeID";
            // //document.getElementById("classNameLi").appendChild(divnode);
            // document.getElementById("classNameLi").appendChild(trNode);
            // var dnode = document.createElement('td');
            // var textNode2 = document.createTextNode(students[j]);
            // dnode.appendChild(textNode2);
            // trNode.appendChild(dnode);
            // document.getElementById("classNameLi").appendChild(trNode)
          }
        }
        else {
          // Insert a row at the end of the table
          let newRow = tablenode.rows[0];
          let newCell = newRow.insertCell(-1);
          let newText = document.createTextNode(temp[i]);
          newCell.appendChild(newText);
          taskCount++;
          var rows = tablenode.getElementsByTagName("tr");

          if (taskCount != 1) {
            addCell(rows);
          }


        }


      };


      // var table = document.getElementById('tableID');

    });
  }else{
    window.location.replace("http://www.behavv.com");
  }
})

function addCell(rows) {
  for (k = 1; k <= (rows.length - 1); k++) {
    let blankCell = rows[k].insertCell(-1);
    var ddnode = document.createElement('input');
    // var ddonode = document.createElement('option');
    // var ddonode2 = document.createElement('option');
    // var ddonode3 = document.createElement('option');
    // var ddonode4 = document.createElement('option');
    // var ddonode5 = document.createElement('option');
    // var ddonodesel = document.createElement('option')

    //let opTextsel = document.createTextNode("Select a value");
    // let opText = document.createTextNode("1");
    // let opText2 = document.createTextNode("2");
    // let opText3 = document.createTextNode("3");
    // let opText4 = document.createTextNode("4");
    // let opText5 = document.createTextNode("5");
    // ddonodesel.appendChild(opTextsel);
    // ddonode.appendChild(opText);
    // ddonode2.appendChild(opText2);
    // ddonode3.appendChild(opText3);
    // ddonode4.appendChild(opText4);
    // ddonode5.appendChild(opText5);

    // ddnode.appendChild(ddonodesel);
    // ddnode.appendChild(ddonode);
    // ddnode.appendChild(ddonode2);
    // ddnode.appendChild(ddonode3);
    // ddnode.appendChild(ddonode4);
    // ddnode.appendChild(ddonode5);
    blankCell.appendChild(ddnode);
  }
}

// for (i = 0; i < classes.length; i++) {
//   students = [];

//   var studentRef = firebase.database().ref('Schools/' + schoolName + "/classes" + "/" + classes[i] + "/Student List");
//   studentRef.on('value', function (snapshot) {
//     snapshot.forEach(function (childSnapshot) {
//       var childSData = childSnapshot.val();
//       var identifier = childSData.studentcid;
//       var finder = studentsNamesList.indexOf(identifier);
//       finder = finder - 1;
//       students.push(studentsNamesList[finder]);
//     });
//     studentsList = students.toString();
//     //console.log(studentsList);
//   });
// }




//   //
//   var node = document.createElement('ul');
//   node.classList.add("tasks"); /*adds classList as class on ul*/

//   var textNode = document.createTextNode("Task Name : " + temp + " Students: " + studentsList);
//   node.appendChild(textNode);
//   //document.getElementById("classNameLi").appendChild(node);

//     });

//   });

// };


var tasks = [];
var taskList;
//Show tasks as table
//log out functionality on top right
function signout() {
  firebase.auth().signOut();
  alert("signed out");
};
const sout = document.getElementById("lout");
sout.addEventListener('click', signout);
//gets signed in user
firebase.auth().onAuthStateChanged(function (user) {

  if (user != null) {
    document.getElementById("linu").innerHTML = user.email;
  } else {
    document.getElementById("linu");
  }
});
  // tasksRef.on('value', function (snapshot) {
  //   //console.log(snapshot);
  //   console.log()
  //   var classesRef = firebase.database().ref('classes');
  //   var classesList;
  //   classesRef.on('value', function (snapshot) {
  //     snapshot.forEach(function (childSnapshot) {
  //       var childData = childSnapshot.val();
  //       classesRef.on('child_added', function (snapshot) {
  //         //Do something with the data
  //         //document.getElementById("classNameLi").innerHTML = childData.className;

  //       });
  //       classes.push(childData.className);
  //       classes.push(childData.Tasks);
  //     });

