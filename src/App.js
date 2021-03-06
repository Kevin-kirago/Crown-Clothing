import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

// pages
import Homepage from "./pages/home/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignPage from "./pages/sign/sign.component";
import CheckOutPage from "./pages/checkout/checkout.component";

// Components
import Header from "./components/header/header.component";

const App = ({ checkUserSession, currentUser }) => {
	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);

	return (
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={Homepage} />
				<Route path="/shop" component={ShopPage} />
				<Route exact path="/checkout" component={CheckOutPage} />
				<Route exact path="/sign" render={() => (currentUser ? <Redirect to="/" /> : <SignPage />)} />
			</Switch>
		</div>
	);
};

// used for extracting data from the store in redux
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatchEvent) => ({
	checkUserSession: () => dispatchEvent(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
