import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// pages
import Homepage from "./pages/home/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignPage from "./pages/sign/sign.component";

// Components
import Header from "./components/header/header.component";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			currentUser: null
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		// get update on auth event change(login or signout)
		// listen to auth state change

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			console.log(userAuth);
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					this.setState(
						{
							currentUser: {
								id: snapShot.id,
								...snapShot.data()
							}
						},

						() => {
							console.log(this.state);
						}
					);
				});
			}

			this.setState({ currentUser: userAuth });
		});
	}

	componentWillUnmount() {
		// closes the auth subscription
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route exact path="/shop" component={ShopPage} />
					<Route exact path="/sign" component={SignPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
