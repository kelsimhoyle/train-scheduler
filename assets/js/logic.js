  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDtttkDl6Gbn4pkkALRRveD84OptOV5gKQ",
    authDomain: "fir-homework-63f6b.firebaseapp.com",
    databaseURL: "https://fir-homework-63f6b.firebaseio.com",
    projectId: "fir-homework-63f6b",
    storageBucket: "",
    messagingSenderId: "681985671529",
    appId: "1:681985671529:web:daf88f92c9c06b42"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

    // Create a variable to reference the database
    var database = firebase.database();

var trainName;
var destination;
var firstTrainTime;
var frequency;

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });
});

database.ref().on("child_added", function(childSnapshot) {
    // triggered once for each child on page load
    // each time a child is added
    var row = $("<tr>").append(
        $("<td>").text(childSnapshot.val().trainName),
        $("<td>").text(childSnapshot.val().destination),
        $("<td>").text(childSnapshot.val().frequency),
        $("<td>").text("TBD"),
        $("<td>").text("TBD")
    );
    // add to the table
    $("tbody").prepend(row);
  }, function(errorObj) {
    console.log(errorObj.code);
  });
