import React from "react";
import "./collection-overview.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionForPreview } from "../../redux/shop/shop.selectors";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

const CollectionOverview = ({ collection }) => {
	return (
		<div className="collections-overview">
			{collection.map(({ id, ...otherCollectionProps }) => {
				return <CollectionPreview key={id} {...otherCollectionProps} />;
			})}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	collection: selectCollectionForPreview
});

export default connect(mapStateToProps)(CollectionOverview);
