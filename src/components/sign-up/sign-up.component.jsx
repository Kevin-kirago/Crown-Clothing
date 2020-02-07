import React from "react";
import "./sign-up.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

export default class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName: "",
			email: "",
			password: "",
			confirmPassword: ""
		};
	}

	handleSubmit = async e => {
		e.preventDefault();

		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}

		try {
			// create a new user associated with the email and password
			const { user } = await auth.createUserWithEmailAndPassword(email, password);

			await createUserProfileDocument(user, { displayName });

			this.setState({
				displayName: "",
				email: "",
				password: "",
				confirmPassword: ""
			});
		} catch (e) {
			console.log(e);
		}
	};

	// listens for value input or change from the form inputs
	handleChange = e => {
		const { name, value } = e.target;

		// set the state after the event change happens
		this.setState({ [name]: value });
	};

	render() {
		const { displayName, email, password, confirmPassword } = this.state;

		return (
			<div className="sign-up">
				<h2 className="title">I do not have an account</h2>
				<span>Sign up with your email and password</span>

				<form className="sign-up-form" onSubmit={this.handleSubmit}>
					<FormInput type="text" name="displayName" value={displayName} onChange={this.handleChange} label="Display Name" required />
					<FormInput type="email" name="email" value={email} onChange={this.handleChange} label="Email" required />
					<FormInput type="password" name="password" value={password} onChange={this.handleChange} label="Password" required />
					<FormInput type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} label="Confirm Password" required />
					<CustomButton type="submit"> Sign Up</CustomButton>
				</form>
			</div>
		);
	}
}
