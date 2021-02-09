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
var userSchool;
var classRef = firebase.database().ref('classes');
var taskCount = 0;

var temp = [];
var tasks = [];
var tasksID = [];
var taskList;
var dTable;
var gorger;
var gorgerr;
var cumul = 0;


// var formModal = document.getElementById("formModal");
// var infobtn = document.getElementById("addInfoModal");
// var span1 = document.getElementsByClassName("close")[0];

//  infobtn.onclick = function () {
//  formModal.style.display = "block";
// }
// span1.onclick = function () {
//   formModal.style.display = "none";
// }
// window.onclick = function (event) {
//   if (event.target == formModal) {
//     formModal.style.display = "none";
//   }
// }

function drawOChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Number of Ratings'],
    ['5', 11],
    ['4', 2],
    ['3', 2],
    ['2', 2],
    ['1', 7]
  ]);

  var options1 = {
    title: 'Total Ratings',
    pieHole: 0.4,
    legend: 'none',
    titleTextStyle: {
      color: 'black',
      fontSize: 20,
    },
    chartArea: {
      // leave room for y-axis labels
      width: '30%'
    },
  };

  var chart = new google.visualization.PieChart(document.getElementById('chartContainer3'));

  var data2 = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['Monday', 1000, 400],
    ['Tuesday', 1170, 460],
    ['Wednesday', 660, 1120],
    ['Thursday', 1030, 540],
    ['Friday', 1030, 540],
  ]);
  var options2 = {
    title: 'Weekly Comparison',
    pieHole: 0.4,
    legend: 'none',
    titleTextStyle: {
      color: 'black',
      fontSize: 20,
    },
    // chartArea: {
    //   // leave room for y-axis labels
    //   width: '60%'
    // },
  };

  var chart2 = new google.visualization.ColumnChart(document.getElementById('chartContainer4'));

  // var data3 = new google.visualization.DataTable();
  // data3.addColumn('string', 'Name');
  // data3.addColumn('number', 'Salary');
  // data3.addColumn('boolean', 'Full Time Employee');
  // data3.addRows([
  //   ['Mike',  {v: 10000, f: '$10,000'}, true],
  //   ['Jim',   {v:8000,   f: '$8,000'},  false],
  //   ['Alice', {v: 12500, f: '$12,500'}, true],
  //   ['Bob',   {v: 7000,  f: '$7,000'},  true]
  // ]);
  // var options3 = {
  //   title: 'My Daily Activities',
  // };

  // var chart3 = new google.visualization.Table(document.getElementById('chartContainer5'));

  chart.draw(data, options1);
  chart2.draw(data2, options2);
  // chart3.draw(data3, options3);
}
// Define the chart to be drawn.
google.charts.load('current', { packages: ['corechart'] });

function drawChart(name) {
  if (typeof(name) == "undefined"){
    return
  }
    // userSchool = user.displayName;
    var studentRef = firebase.database().ref('Schools/' + userSchool + "/classes");
    //studentRef.on('value', function (snapshot) {
      //console.log(snapshot);
      // snapshot.forEach(function (childSnapshot) {
      //   var childData = childSnapshot.val();
      //   var taskName = childData.taskName;

        // taskName = taskName.replace(/\s/g, '');
        // tasks.push(taskName);
        // console.log(taskName);
        //console.log(childData.className);
        //drawChart(className);
        var data = this["marker" + name]
        var options = {
          title: name
          , width: 500
          , height: 300
          , isStacked: 'percent'
          , titleTextStyle: {
            color: 'black',
            fontSize: 20,
          },
          colors: ['green', 'red'],
          legend: 'none',
        };
      
        var data = new google.visualization.arrayToDataTable([
          ['Task', 'Completed', 'Incomplete', { role: 'annotation' }],
          ['taskName', 10, 30, ''],
          ['taskName', 15, 30, ''],
          ['taskName', 30, 30, '']
        ]);
      
        // Instantiate and draw the chart.
        var chart = this.chart
        chart = new google.visualization.BarChart(document.getElementById(name));
        chart.draw(data, options);
        //console.log(childSnapshot);
  
      //})
    
    //})
  
  
  console.log(name);
  // Define the chart to be drawn.

  
}
google.charts.setOnLoadCallback(drawChart);
firebase.auth().onAuthStateChanged(function (user) {
  userSchool = user.displayName;
  var studentRef = firebase.database().ref('Schools/' + userSchool + "/classes/mathology/tasks/");
  studentRef.on('value', function (snapshot) {
    //console.log(snapshot);
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();

      var taskName = childData.taskName;
      taskName = taskName.replace(/\s/g, '');
      tasks.push(taskName);
      //console.log(childData.className);
      //drawChart(className);

      //console.log(childSnapshot);

    })
    for (i = 0; i <= (classes.length - 1); i++) {
      var text = document.createTextNode(classes[i]);
      var tag = document.createElement("p");
      var newRDiv = document.createElement("div");
      newRDiv.appendChild(tag);
      tag.appendChild(text);
      newRDiv.id = classes[i];
      newRDiv.className = "graphs";
      var element = document.getElementById("myPieChart");
      element.appendChild(newRDiv);
      console.log(classes[i])
      drawChart(classes[i]);
    }
  })
})






firebase.auth().onAuthStateChanged(function (user) {
  userSchool = user.displayName;
  var studentRef = firebase.database().ref('Schools/' + userSchool + "/classes");
  studentRef.on('value', function (snapshot) {
    //console.log(snapshot);
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();

      var className = childData.className;
      className = className.replace(/\s/g, '');
      classes.push(className);
      //console.log(childData.className);
      //drawChart(className);

      //console.log(childSnapshot);

    })
    for (i = 0; i <= (classes.length - 1); i++) {
      var text = document.createTextNode(classes[i]);
      var tag = document.createElement("p");
      var newRDiv = document.createElement("div");
      newRDiv.appendChild(tag);
      tag.appendChild(text);
      newRDiv.id = classes[i];
      newRDiv.className = "graphs";
      var element = document.getElementById("myPieChart");
      element.appendChild(newRDiv);
      drawChart(classes[i]);
    }
  })
})




function newChart() {

  const newDiv = document.createElement("div");

  // and give it some content
  const chart = new CanvasJS.Chart("div1",
    {
      title: {
        text: "Number of Students in Each Room"
      },
      axisX: {
        title: "Rooms"
      },
      axisY: {
        title: "percentage"
      },
      data: [
        {
          type: "stackedColumn100",
          legendText: "Boys",
          showInLegend: "true",
          indexLabel: "#percent %",
          indexLabelPlacement: "inside",
          indexLabelFontColor: "white",
          dataPoints: [
            { y: 40, label: "Cafeteria" },
            { y: 10, label: "Lounge" },
            { y: 72, label: "Games Room" },
            { y: 30, label: "Lecture Hall" },
            { y: 21, label: "Library" }
          ]
        },
        {
          type: "stackedColumn100",
          legendText: "Girls",
          showInLegend: "true",
          indexLabel: "#percent %",
          indexLabelPlacement: "inside",
          indexLabelFontColor: "white",
          dataPoints: [
            { y: 20, label: "Cafeteria" },
            { y: 14, label: "Lounge" },
            { y: 40, label: "Games Room" },
            { y: 43, label: "Lecture Hall" },
            { y: 17, label: "Library" }
          ]

        },
      ]
    });
  oChart.render();
  oChart1.render();
  oChart2.render();
  chart.render();
  chart2.render();

}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    uid = user.uid;
    email = user.email;
    schoolName = user.displayName;
    var classRef = firebase.database().ref('Schools/' + schoolName + "/classes");
    drawOChart();
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
          // document.getElementById("classNameLi").appendChild(node)
          var tablenode = document.createElement('table');
          tablenode.setAttribute("id", temp3);
          dTable = tablenode;

          let newRow = tablenode.insertRow(-1);
          // let newCell = newRow.insertCell(0);
          // let newText = document.createTextNode('');
          // newCell.appendChild(newText);
          //document.getElementById("classNameLi").appendChild(tablenode);
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

  } else {
    //window.location.replace("http://www.behavv.com");
  }
})

function addCell(rows) {
  for (k = 1; k <= (rows.length - 1); k++) {
    let blankCell = rows[k].insertCell(-1);
    var ddnode = document.createElement('input');
    ddnode.value = "1";
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

// for (i = 0; i < classes.length; {
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

var studentList = [];
var cumul = 0;
 function taskPercentDone(className, taskName){
   cumul = 0;
   firebase.database().ref('Schools/' + schoolName + "/classes/" + className +"/Student List").once("value", function (snapshot) {
     snapshot.forEach(function(item){
       var itum = item.val();
       itum = itum.studentName;
       studentList.push(itum);
     });
     for (m = 0; m < studentList.length; m++) {
       firebase.database().ref('Schools/'+ schoolName +'/dailyReports/'+ currentDate + '/'+ className +"/" + studentList[m] + "/" + taskName).once("value", function (snapshot) {
         var tSnap = snapshot.val();
         tSnap = tSnap.rating;
         tSnap = parseInt(tSnap);
         cumul += tSnap;
       });
     }
     }); 
 };
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
//var className;
/*saveButton.onclick = function () {
  for (i = 0; i < classes.length; i++) {
    console.log(schoolName);
    className = classes[i];
    var taskNumber = 0;
    firebase.database().ref('Schools/' + schoolName + "/classes/" + className + "/Tasks").orderByChild("tasks").once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        taskNumber = taskNumber + 1;
      });
    });
    var rowsNumber = document.getElementById(className).rows.length;
    for (p = 1; p < rowsNumber; p++) {
      var currentDate = m + "-" + d + "-" + y;
      var studentName = document.getElementById(className).rows[p].cells[0].innerHTML;
      firebase.database().ref('Schools/' + schoolName + "/dailyReports").orderByKey().equalTo(currentDate).once("value", function (snapshot) {

        var dateSnapshot = snapshot.val();

        if (dateSnapshot) {

        } else {
          firebase.database().ref('Schools/' + schoolName + '/dailyReports/' + currentDate).push({});
        }
      });

      for (j = 1; j < taskNumber + 1; j++) {
        var taskName = document.getElementById(className).rows[0].cells[j].innerHTML;
        var ratingValue = document.getElementById(className).rows[p].cells[j].firstChild.value;
        if (ratingValue) {
          firebase.database().ref('Schools/' + schoolName + '/dailyReports/' + currentDate + "/" + className + "/" + studentName + '/' + taskName).set({ rating: ratingValue });
        }

      };
    };
  };
};

var studentList = [];
function taskPercentDone(className, taskName){
  cumul = 0;
  firebase.database().ref('Schools/' + schoolName + "/classes/" + className +"/Student List").once("value", function (snapshot) {
    snapshot.forEach(function(item){
      var itum = item.val();
      itum = itum.studentName;
      studentList.push(itum);
    });
    for (m = 0; m < studentList.length; m++) {
      firebase.database().ref('Schools/'+ schoolName +'/dailyReports/'+ currentDate + '/'+ className +"/" + studentList[m] + "/" + taskName).once("value", function (snapshot) {
        var tSnap = snapshot.val();
        tSnap = tSnap.rating;
        tSnap = parseInt(tSnap);
        cumul += tSnap;
      });
    }
    }); 
};

//Example of taskPercentDone Usage needs className and taskName defined before it can run.
// firebase.auth().onAuthStateChanged(function (user) {
//   if (user != null) {
//     taskPercentDone(className, taskName);
//   setTimeout(function(){
//   console.log(((cumul/(studentList.length * 5)) * 100) + "%");
//  },1500); 
//   } else {
//     console.log("User not logged in.");
//   }
// });

/*
Research toward color boxes on dashboard
https://www.w3schools.com/Jsref/prop_style_backgroundcolor.asp

document.body.style.backgroundColor = "red"; //makes body elements red
document.getElementById("myDiv").style.backgroundColor = "lightblue";

*/