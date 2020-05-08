import shopActionTypes from "./shop.types";

const initial_state = {
	collections: null,
};

const shopReducer = (state = initial_state, action) => {
	switch (action.type) {
		case shopActionTypes.UPDATE_COLLECTIONS:
			return {
				...state,
				collections: action.payload,
			};
		default:
			return state;
	}
};

export default shopReducer;
