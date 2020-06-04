import React, { useState } from "react";
import { connect } from "react-redux";
import { userSignUpStart } from "../../redux/user/user.actions";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import "./sign-up.styles.scss";

const SignUp = ({ signUpStart }) => {
	const [userCredentials, setUserCredentials] = useState({ displayName: "", email: "", password: "", confirmPassword: "" });
	const { displayName, email, password, confirmPassword } = userCredentials;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}
		signUpStart({ displayName, email, password });
	};

	// listens for value input or change from the form inputs
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className="sign-up">
			<h2 className="title">I do not have an account</h2>
			<span>Sign up with your email and password</span>

			<form className="sign-up-form" onSubmit={handleSubmit}>
				<FormInput type="text" name="displayName" value={displayName} onChange={handleChange} label="Display Name" required />
				<FormInput type="email" name="email" value={email} onChange={handleChange} label="Email" required />
				<FormInput type="password" name="password" value={password} onChange={handleChange} label="Password" required />
				<FormInput type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} label="Confirm Password" required />
				<CustomButton type="submit"> Sign Up</CustomButton>
			</form>
		</div>
	);
};

const mapDispatchToProps = (dispatchEvent) => ({
	signUpStart: (userCredentials) => dispatchEvent(userSignUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
