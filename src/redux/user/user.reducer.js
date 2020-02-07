const Initial_State = {
	currentUser: null
};

// if state is ever undefined the fallback = initial state
const userReducer = (state = Initial_State, action) => {
	switch (action.type) {
		case "SET_CURRENT_USER":
			return {
				...state,
				currentUser: action.payload
			};
		default:
			return state;
	}
};

export default userReducer;
