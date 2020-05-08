import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// firebase credentials for the crown-clothing project (provided by firebase)
const config = {
	apiKey: "AIzaSyCDEcivsPElcdVQxnJJyzbwg-6WDuU7OX4",
	authDomain: "crown-clothing-9f7bf.firebaseapp.com",
	databaseURL: "https://crown-clothing-9f7bf.firebaseio.com",
	projectId: "crown-clothing-9f7bf",
	storageBucket: "crown-clothing-9f7bf.appspot.com",
	messagingSenderId: "943653595450",
	appId: "1:943653595450:web:997236a5a6e91bda158803",
	measurementId: "G-8Y6TNWB8YT",
};
firebase.initializeApp(config);

// creating no sql docs for storing users to our database
export const createUserProfileDocument = async (userAuth, additionalData) => {
	// check if we are getting the user auth object
	if (!userAuth) return;

	/*
	 - A query is a request we make to firestore to give us something from the database
	 - Firestore returns us two types of objects: references and snapshot. 
	   Of these objects, they can either be Document or Collection versions.
	 - Firestore will always return us these objects, even if nothing exists at from that query.  
	*/

	// pulling the documentReference object based on userId
	const userRef = firestore.doc(`users/${userAuth.uid}`);

	// fetching the doc snapshot of the object from the auth utility
	const snapShot = await userRef.get();

	// check if the snapshot exists
	if (!snapShot.exists) {
		// data used to create the actual document
		const { displayName, email } = userAuth;

		// new timestamp date
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (err) {
			console.log("Error creating user", err.message);
		}
	}

	return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach((obj) => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const converCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map((doc) => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items,
		};
	});

	// reduce our transformed collection to our collectionMap object with keys
	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

// initializing the authentication function from firebase
export const auth = firebase.auth();

// initializing the database function from firebase (firestore function)
export const firestore = firebase.firestore();

// google authentication utility
const provider = new firebase.auth.GoogleAuthProvider();

// trigger google popup
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
