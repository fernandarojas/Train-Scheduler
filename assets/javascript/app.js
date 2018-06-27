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

    //executes the updater function every minute to update automatically 
    //the expected time on the table 

    setInterval(function() {
        console.log("interval run");
        $("#trainTable > tbody").empty();
   //Calls updater to create all the rows in the table.
        updater();
    }, 60 * 1000);

    //button to add train
    $("#run-submit").on("click", function() { 
        event.preventDefault();

        // grab inputs
        var trainRoute = $("#trainRoute-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainTime = moment($("#time-input").val().trim(),"HH:mm").format("X");
        var trainFrequency = $("#frequency-input").val().trim();
        
        //push to DB
        var newTrain = {
            route: trainRoute,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency,
        }
        dataRef.ref().push(newTrain); 

        alert("Train successfully added");

        // clear text inputs 
        $("#trainRoute-input").val("");   
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");

        $("#trainTable > tbody").empty();

        updater();
    });

//pulls data from firebase and feeds the rows in the table 
    function updater() { 
        dataRef.ref().on("child_added", function(snapshot) {
            console.log(snapshot.val()); 
    
            var trainRoute = snapshot.val().route;
            var trainDestination = snapshot.val().destination;
            var trainTime = snapshot.val().time; 
            var trainFrequency = snapshot.val().frequency;

    //Converting the time to display in the table from unix time to HH:MM
            var fixedTime = moment.unix(trainTime).format("hh:mm A");
            console.log(fixedTime);

    //Calculate the difference between the arrival time and the actual time.
            var mins = moment().diff(moment(trainTime, "X"), "minutes") * (1);

            console.log(mins);

        // add data to table
        $("#trainTable > tbody").append('<tr><td>' + trainRoute + '</td><td>' + trainDestination + '</td><td>' + trainFrequency + '</td><td>' + fixedTime + '</td><td>' + mins + '</td><tr>');
        });
    }
    
    updater();