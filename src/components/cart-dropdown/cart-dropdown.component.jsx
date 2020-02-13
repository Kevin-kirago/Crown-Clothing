import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import "./cart-dropdown.styles.scss";

import CartItem from "../cart-item/cart-item.component";
import { connect } from "react-redux";

const CartDropdown = ({ cartItems }) => {
	return (
		<div className="cart-dropdown">
			<div className="cart-items">
				{cartItems.map(cartItem => {
					return <CartItem key={cartItem.id} item={cartItem} />;
				})}
			</div>
			<CustomButton>GO TO CHECKOUT</CustomButton>
		</div>
	);
};

// detructuring cartItems from state
const mapStateToProps = ({ cart }) => {
	return {
		cartItems: cart.cartItems
	};
};

export default connect(mapStateToProps)(CartDropdown);