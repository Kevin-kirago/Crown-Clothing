import UserActionTypes from "./user.types";

const Initial_State = {
	currentUser: null,
	error: null,
};

// if state is ever undefined the fallback = initial state
const userReducer = (state = Initial_State, action) => {
	switch (action.type) {
		// when return data of the same type ther is no need for having multiple case formats
		case UserActionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				error: null,
			};
		case UserActionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				error: null,
			};
		case UserActionTypes.SIGN_IN_FAILURE:
		case UserActionTypes.SIGN_OUT_FAILURE:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
