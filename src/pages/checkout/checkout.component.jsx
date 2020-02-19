import React from "react";
import "./checkout.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartItemsCount, selectCartTotal } from "../../redux/cart/cart.selectors";

import CheckOutItem from "../../components/checkout-item/checkout-item.component";

const CheckOutPage = ({ cartItems, total }) => {
	return (
		<div className="checkout-page">
			<div className="checkout-header">
				<div className="header-block">
					<span>Product</span>
				</div>
				<div className="header-block">
					<span>Description</span>
				</div>
				<div className="header-block">
					<span>Quantity</span>
				</div>
				<div className="header-block">
					<span>Price</span>
				</div>
				<div className="header-block">
					<span>Remove</span>
				</div>
			</div>
			{cartItems.map(cartItem => (
				<CheckOutItem key={cartItem.id} cartItem={cartItem} />
			))}
			<div className="total">
				<span>Total: ${total}</span>
			</div>
		</div>
	);
};

// pulling  data of from the redux state
const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	itemCount: selectCartItemsCount,
	total: selectCartTotal
});

export default connect(mapStateToProps)(CheckOutPage);
