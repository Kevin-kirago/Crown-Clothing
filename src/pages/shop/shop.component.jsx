import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import "./shop.styles.scss";
import CollectionOverivewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionPageContainer from "../collection/collection.container";

// props match are acquired from app js since shoppage is nested in a route
const ShopPage = ({ fetchCollectionsStart, match }) => {
	useEffect(() => {
		fetchCollectionsStart();
	}, [fetchCollectionsStart]);

	return (
		<div className="shop-page">
			<Route exact path={`${match.path}`} component={CollectionOverivewContainer} />
			<Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
		</div>
	);
};

const mapDispatchToProps = (dispatchEvent) => ({
	fetchCollectionsStart: () => dispatchEvent(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
