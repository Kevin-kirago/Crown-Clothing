import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Homepage from "./pages/homepage/homepage.component";

class App extends Component {
	HatsPage = props => {
		console.log(props);
		return (
			<div>
				<h1>Hats page</h1>
			</div>
		);
	};

	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route exact path="/hats" component={this.HatsPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
