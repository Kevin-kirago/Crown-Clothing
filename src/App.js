import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import "./App.css";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// pages
import Homepage from "./pages/home/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignPage from "./pages/sign/sign.component";

// Components
import Header from "./components/header/header.component";

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;

		// get update on auth event change(login or signout)
		// listen to auth state change

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					// set state is asynchronous so we callback any event after set state
					setCurrentUser({
						id: snapShot.id,
						// .data retrieves data from the document as an object
						...snapShot.data()
					});
				});
			}

			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		// closes the auth subscription
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/shop" component={ShopPage} />
					<Route exact path="/sign" render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignPage />)} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = ({ user }) => {
	return {
		currentUser: user.currentUser
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setCurrentUser: user => dispatch(setCurrentUser(user))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
