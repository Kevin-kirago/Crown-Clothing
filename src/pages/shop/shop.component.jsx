import React from "react";
import { Route } from "react-router-dom";

import "./shop.styles.scss";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

// props match are acquired from app js since shoppage is nested in a route
const ShopPage = ({ match }) => {
	console.log(match);

	return (
		<div className="shop-page">
			<Route exact path={`${match.path}`} component={CollectionOverview} />
			<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
		</div>
	);
};

export default ShopPage;
