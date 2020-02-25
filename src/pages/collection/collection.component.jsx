import React from "react";
import "./collection.styles.scss";

import { connect } from "react-redux";
import { selectCollections } from "../../redux/shop/shop.selectors";

// import CollectionItem from "../../components/checkout-item/checkout-item.component";

const CollectionPage = ({ collection }) => {
	console.log(collection);

	return (
		<div className="collection-page">
			<h2>Collection page</h2>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		collection: selectCollections(ownProps.match.params.collectionId)(state)
	};
};

export default connect(mapStateToProps)(CollectionPage);
