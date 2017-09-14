(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAbvrZbVhmE_4zJe4KlSrsdSDOr4i0560c",
    authDomain: "cmps-411-music-department-ms.firebaseapp.com",
    databaseURL: "https://cmps-411-music-department-ms.firebaseio.com",
    projectId: "cmps-411-music-department-ms",
    storageBucket: "cmps-411-music-department-ms.appspot.com",
    messagingSenderId: "122196121534"
  };
  firebase.initializeApp(config);
    
    //Get Elements
    var preObject = doument.getElementById('object');
    
    //Creat ref
    var dbRefObject = firebase.database().ref().child('object');
    
    //Sync object changes
    dbRefObject.on('value', snap => console.log(snap.val()));
}
}());