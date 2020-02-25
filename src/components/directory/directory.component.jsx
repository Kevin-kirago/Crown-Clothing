import React from "react";
import "./directory.styles.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySection } from "../../redux/directory/directory.selectors";

import MenuItem from "../menu-item/menu-item.component";

const Directory = ({ section }) => {
	return (
		<div className="directory-menu">
			{section.map(({ id, ...sectionProps }) => (
				<MenuItem key={id} {...sectionProps} />
			))}
		</div>
	);
};

const mapSateToProps = createStructuredSelector({
	section: selectDirectorySection
});

export default connect(mapSateToProps)(Directory);
