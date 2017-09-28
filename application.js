// TODO: Replace with your project's config object. You can find this
// by navigating to your project's console overview page
// (https://console.firebase.google.com/project/your-project-id/overview)
// and clicking "Add Firebase to your web app"
var config = {
    apiKey: "AIzaSyAbvrZbVhmE_4zJe4KlSrsdSDOr4i0560c",
    authDomain: "cmps-411-music-department-ms.firebaseapp.com",
    databaseURL: "https://cmps-411-music-department-ms.firebaseio.com",
    projectId: "cmps-411-music-department-ms",
    storageBucket: "cmps-411-music-department-ms.appspot.com",
    messagingSenderId: "122196121534"
};

// Initialize your Firebase app
firebase.initializeApp(config);

// Reference to the Instruments object in your Firebase database
var Instruments = firebase.database().ref("Instruments");

// Save a new Instrument to the database, using the input in the form
var submitInstrument = function () {

  // Get input values from each of the form elements
  var BRAND = $("#talkBRAND").val();
  var CONDITION = $("#talkCONDITION").val();
  var HASMOUTHPIECE = $("#talkHASMOUTHPIECE").val();
  var NOTES = $("#talkNOTES").val();
  var TYPE = $("#talkTYPE").val();

  // Push a new Instrument to the database using those values
  Instruments.push({
    "BRAND": BRAND,
    "CONDITION": CONDITION,
	"HAS MOUTHPIECE": HASMOUTHPIECE,
	"NOTES": NOTES,
	"TYPE": TYPE
  });
};

// Get the single most recent Instrument from the database and
// update the table with its values. This is called every time the child_added
// event is triggered on the Instruments Firebase reference, which means
// that this will update EVEN IF you don't refresh the page. Magic.
Instruments.limitToLast(1).on('child_added', function(childSnapshot) {
  // Get the Instrument data from the most recent snapshot of data
  // added to the Instruments list in Firebase
  Instrument = childSnapshot.val();

  // Update the HTML to display the Instrument text
  $("#BRAND").html(Instrument.BRAND)
  $("#CONDITION").html(Instrument.CONDITION)
  $("#HASMOUTHPIECE").html(Instrument.HASMOUTHPIECE)
  $("#NOTES").html(Instrument.NOTES)
  $("#TYPE").html(Instrument.TYPE)

  // Make the link actually work and direct to the URL provided
  //$("#link").attr("href", Instrument.link)
});

// When the window is fully loaded, call this function.
// Note: because we are attaching an event listener to a particular HTML element
// in this function, we can't do that until the HTML element in question has
// been loaded. Otherwise, we're attaching our listener to nothing, and no code
// will run when the submit button is clicked.
$(window).load(function () {

  // Find the HTML element with the id InstrumentForm, and when the submit
  // event is triggered on that element, call submitInstrument.
  $("#InstrumentForm").submit(submitInstrument);

});