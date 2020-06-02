import UserActionTypes from "./user.types";

export const userSignUpStart = (userCredentials) => ({
	type: UserActionTypes.USER_SIGN_UP_START,
	payload: userCredentials,
});

export const googleSignInStart = () => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (emailAndPassword) => ({
	type: UserActionTypes.EMAIL_SIGN_IN_START,
	payload: emailAndPassword,
});

export const signOutStart = () => ({
	type: UserActionTypes.SIGN_OUT_START,
});

export const signUpSuccess = ({ user, additionalData }) => ({
	type: UserActionTypes.SIGN_UP_SUCCESS,
	payload: { user, additionalData },
});

export const signInSucess = (user) => ({
	type: UserActionTypes.SIGN_IN_SUCCESS,
	payload: user,
});
export const signOutSuccess = () => ({
	type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signInFailure = (msg) => ({
	type: UserActionTypes.SIGN_IN_FAILURE,
	payload: msg,
});

export const signUpFailure = (msg) => ({
	type: UserActionTypes.SIGN_IN_FAILURE,
	payload: msg,
});

export const checkUserSession = () => ({
	type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutFailure = (error) => ({
	type: UserActionTypes.SIGN_OUT_FAILURE,
	payload: error,
});
