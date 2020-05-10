import shopActionTypes from "./shop.types";

const initial_state = {
	collections: null,
	isFetching: false,
	errorMessage: undefined,
};

const shopReducer = (state = initial_state, action) => {
	switch (action.type) {
		case shopActionTypes.FETCH_COLLECTIONS_START:
			return {
				...state,
				isFetching: true,
			};
		case shopActionTypes.FETCH_COLLECTIONS_SUCCESS:
			return {
				...state,
				collections: action.payload,
				isFetching: false,
			};
		case shopActionTypes.FETCH_COLLECTIONS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
};

export default shopReducer;
