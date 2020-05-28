import { takeLatest, call, put } from "redux-saga/effects";
import { firestore, converCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import ShopActionTypes from "./shop.types";

import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shop.actions";

export function* fetchCollectionsAsync() {
	yield console.log("I am fired");

	try {
		const collectionRef = firestore.collection("collections");
		const snapshot = yield collectionRef.get();
		const collectionsMap = yield call(converCollectionsSnapshotToMap, snapshot);
		yield put(fetchCollectionsSuccess(collectionsMap));
	} catch (e) {
		yield put(fetchCollectionsFailure(e.message));
	}
}

export function* fetchCollectionsStart() {
	// take every listens to every type action
	// take latest listens to the last action fired therefore favorable
	yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
