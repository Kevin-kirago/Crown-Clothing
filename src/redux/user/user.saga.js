import { signUpSuccess, signUpFailure, signInSucess, signInFailure, signOutSuccess, signOutFailure } from "./user.actions";
import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";

// put is essentially the saga way of dispatching actions
// user session
export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (e) {
		yield put(signInFailure(e));
	}
}

export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

/* utility func
 * receive arguments from the action type fired (user data and additional data props)
 */
export function* getSnapshotFromUserAuth(userAuth) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth);
		const userSnapshot = yield userRef.get();
		yield put(signInSucess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (e) {
		yield put(signInFailure(e));
	}
}

// sign up saga
export function* userSignUp({ payload: { email, password, displayName } }) {
	try {
		// create a new user associated with the email and password
		const { user } = yield auth.createUserWithEmailAndPassword(email, password);
		yield put(signUpSuccess({ user, additionalData: { displayName } }));
	} catch (e) {
		yield put(signUpFailure(e));
	}
}
export function* onSignUpStart() {
	yield takeLatest(UserActionTypes.USER_SIGN_UP_START, userSignUp);
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
	yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess() {
	yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// google saga
export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (e) {
		yield put(signInFailure(e));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// email saga
export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (e) {
		yield put(signInFailure(e));
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

// sign out
export function* signOut() {
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
	} catch (e) {
		yield put(signOutFailure(e));
	}
}

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSaga() {
	yield all([
		call(onCheckUserSession),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignOutStart),
	]);
}
