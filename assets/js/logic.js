// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDtttkDl6Gbn4pkkALRRveD84OptOV5gKQ",
    authDomain: "fir-homework-63f6b.firebaseapp.com",
    databaseURL: "https://fir-homework-63f6b.firebaseio.com",
    projectId: "fir-homework-63f6b",
    storageBucket: "fir-homework-63f6b.appspot.com",
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

    var timeReg = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/;
    var numReg = /^\d+$/;


    if (trainName === "" || destination === "" || firstTrainTime === "" || frequency === "") {
        return false;
    }
    
    if (!timeReg.test(firstTrainTime)) {
      $("#time-input").attr('style', "border-radius: 5px; border:#FF0000 1px solid;").val("Please enter a correct time.");
      return false;
    } 

    if (!numReg.test(frequency)) {
      $("#frequency-input").attr('style', "border-radius: 5px; border:#FF0000 1px solid;").val("Please enter a correct number.");
      return false;
    }

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });

    $("#train-name-input, #destination-input, #time-input, #frequency-input").val("").removeAttr("style");
});

database.ref().on("child_added", function(childSnapshot) {
    // triggered once for each child on page load
    // each time a child is added
    
    var firstTrainMoment = moment(childSnapshot.val().firstTrainTime, "HH:mm").subtract(1, "years");
    var difference = moment().diff(moment(firstTrainMoment), "minutes");
    var remainder = difference % childSnapshot.val().frequency;
    var minutesAway = childSnapshot.val().frequency - remainder;
    console.log(minutesAway);
    var nextArrival = moment().add(minutesAway, "minutes");
  
    var row = $("<tr>").append(
        $("<td>").text(childSnapshot.val().trainName),
        $("<td>").text(childSnapshot.val().destination),
        $("<td>").text(childSnapshot.val().frequency),
        $("<td>").text(moment(nextArrival).format("HH:mm")),
        $("<td>").text(minutesAway)
    );
    // add to the table
    $("tbody").prepend(row);
  }, function(errorObj) {
    console.log(errorObj.code);
  });
