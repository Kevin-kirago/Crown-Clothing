import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyBkbRu2ALBOb2eo4KKMNLc2qhiuR6-dpPk",
	authDomain: "crown-clothing-db-addc0.firebaseapp.com",
	databaseURL: "https://crown-clothing-db-addc0.firebaseio.com",
	projectId: "crown-clothing-db-addc0",
	storageBucket: "crown-clothing-db-addc0.appspot.com",
	messagingSenderId: "529693799183",
	appId: "1:529693799183:web:cb094825f3bb7ac546c47a",
	measurementId: "G-N2ZGP13ESS"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
