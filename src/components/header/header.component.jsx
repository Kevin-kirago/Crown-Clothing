import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
	return (
		<div className="header">
			<Link className="logo-container" to="/">
				<Logo className="logo" />
			</Link>
			<div className="options">
				<Link className="option" to="/shop">
					SHOP
				</Link>
				{currentUser ? (
					<div className="option" onClick={() => auth.signOut()}>
						SIGN OUT
					</div>
				) : (
					<Link className="option" to="/sign">
						SIGN IN
					</Link>
				)}

				<Link className="option" to="/shop">
					CONATCT
				</Link>
			</div>
		</div>
	);
};

const mapstateProps = state => {
	return {
		currentUser: state.user.currentUser
	};
};

export default connect(mapstateProps)(Header);
