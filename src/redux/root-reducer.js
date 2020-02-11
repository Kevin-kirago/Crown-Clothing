// Root-Reducer Represent all reducers as the base state reduver
import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

export default combineReducers({
	user: userReducer,
	cart: cartReducer
});
