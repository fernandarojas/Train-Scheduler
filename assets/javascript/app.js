 // initialize firebase
var config = {
    apiKey: "AIzaSyD-AtM__73SV--YtIamFXac8jJsJoRSjDM",
    authDomain: "train-scheduler-16abe.firebaseapp.com",
    databaseURL: "https://train-scheduler-16abe.firebaseio.com",
    projectId: "train-scheduler-16abe",
    storageBucket: "",
    messagingSenderId: "47104582874"
  };
  firebase.initializeApp(config);

    var dataRef = firebase.database();

    //button to add employees
    $("#run-submit").on("click", function() { 
        event.preventDefault();

        // grab inputs
        var trainRoute = $("#trainRoute-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainTime = $("#time-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();

        var newTrain = {
            route: trainRoute,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        }
        dataRef.ref().push(newTrain); 

        console.log(newTrain.route);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);
        console.log(newTrainp.dateAdded);

        alert("Employee successfully added");

        // clear text inputs 
        $("#trainRoute-input").val("");   
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");
    });

    // create firebase event for adding employee to the database and a row 
    // in the html when a user adds an entry
    dataRef.ref().on("child_added", function(snapshot) {
        console.log(snapshot.val()); 

        var trainRoute = snapshot.val().route;
        var trainDestination = snapshot.val().destination;
        var trainTime = snapshot.val().time; 
        var trainFrequency = snapshot.val().frequency;

        console.log(trainRoute);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFrequency);

    // add data to table
        $("#trainTable > tbody").append('<tr><td>' + trainRoute + '</td><td>' + trainDestination + '</td><td>' + trainTime + '</td><td>' + trainFrequency + '</td><tr>');

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });