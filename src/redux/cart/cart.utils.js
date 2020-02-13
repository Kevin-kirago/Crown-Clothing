export const addItemToCart = (cartItems, cartItemToAdd) => {
	// finds the first item with the same id as cart item to add if present
	const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

	if (existingCartItem) {
		//if true increments the cartItem quantity by 1
		return cartItems.map(cartItem => (cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
	}

	// if existing cartitem is undefined | or false set cart item quantity to 1 by  default
	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
