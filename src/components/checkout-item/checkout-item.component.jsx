import React from "react";
import "./checkout-item.styles.scss";

import { connect } from "react-redux";
import addItem, { removeItem, clearItem } from "../../redux/cart/cart.actions";

const CheckOutItem = ({ cartItem, addItem, removeItem, clearItem }) => {
	const { imageUrl, name, price, quantity } = cartItem;

	return (
		<div className="checkout-item">
			<div className="image-container">
				<img src={imageUrl} alt="item" />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				<div className="arrow" onClick={() => removeItem(cartItem)}>
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div className="arrow" onClick={() => addItem(cartItem)}>
					&#10095;
				</div>
			</span>
			<div className="arrow"></div>
			<span className="price">{price}</span>
			<div className="remove-button" onClick={() => clearItem(cartItem)}>
				&#10005;
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		addItem: item => dispatch(addItem(item)),
		removeItem: item => dispatch(removeItem(item)),
		clearItem: item => dispatch(clearItem(item))
	};
};

export default connect(null, mapDispatchToProps)(CheckOutItem);
