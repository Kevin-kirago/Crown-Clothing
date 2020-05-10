import shopActionTypes from "./shop.types";
import { firestore, converCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => {
	return {
		type: shopActionTypes.FETCH_COLLECTIONS_START,
	};
};

export const fetchCollectionsSuccess = (collectionsMap) => {
	return {
		type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
		payload: collectionsMap,
	};
};

export const fetchCollectionsFailure = (errorMessage) => {
	return {
		type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
		payload: errorMessage,
	};
};

export const fetchCollectionsStartAsync = () => {
	return (dispatchEvent) => {
		// get a collection reference of collections items from the firestore
		const collectionRef = firestore.collection("collections");

		// spin up the fetch start state
		dispatchEvent(fetchCollectionsStart());

		collectionRef
			.get()
			.then((snapShot) => {
				// convert snapshot object to collectionsMap structure
				const collectionsMap = converCollectionsSnapshotToMap(snapShot);

				// spin up the fetch success action state and passing the payload
				dispatchEvent(fetchCollectionsSuccess(collectionsMap));
			})
			.catch((e) => dispatchEvent(e));
	};
};
