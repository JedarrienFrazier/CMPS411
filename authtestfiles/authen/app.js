(function() {

var config = {
    apiKey: "AIzaSyAXMQmf7-hIz6ync_qjScwEkFmbgLLiIYo",
    authDomain: "the-real-man-world.firebaseapp.com",
    databaseURL: "https://the-real-man-world.firebaseio.com",
    projectId: "the-real-man-world",
    storageBucket: "the-real-man-world.appspot.com",
    messagingSenderId: "179134749320"
};
firebase.initializeApp(config);

const txtEmail = document.getElementById("txtEmail")
const txtPassword = document.getElementById("txtPassword")
const btnLogin = document.getElementById("btnLogin")
const btnSignup = document.getElementById("btnSignup")
const btnLogout = document.getElementById("btnLogout")

btnLogin.addEventListener("click", e => {
	
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();
	
	const promise = auth.signInWithEmailAndPassword(email,pass);
	promise.catch(e => console.log(e.message));	
	
});

btnSignup.addEventListener("click" e => {
	
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();
	
	const promise = auth.createUserWithEmailAndPassword(email,pass);
	promise.catch(e => console.log(e.message));
	
});

btnLogout.addEventListener("click" e => {
	
	firebase.auth().signOut();	
	
});

firebase.auth().onAuthStateChanged(firebaseUser => {
	
	if(firebaseUser){
		console.log(firebaseUser);
		btnLogout.classList.remove("hide");
	} else {
		console.log("not logged in");
		btnLogout.classList.add("hide")
	}
	
});


});