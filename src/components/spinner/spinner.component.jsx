import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";
import "./spinner.styles.scss";

const Spinner = (Wrappedcomponent) => {
	const with_spinner = ({ isLoading, ...otherProps }) => {
		return isLoading ? (
			<SpinnerOverlay>
				<SpinnerContainer />
			</SpinnerOverlay>
		) : (
			<Wrappedcomponent {...otherProps} />
		);
	};

	return with_spinner;
};

export default Spinner;
