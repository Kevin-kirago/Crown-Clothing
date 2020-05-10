import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import "./shop.styles.scss";
import CollectionOverivewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionPageContainer from "../collection/collection.container";

// props match are acquired from app js since shoppage is nested in a route
class ShopPage extends React.Component {
	componentDidMount() {
		const { fetchCollectionsStartAsync } = this.props;
		fetchCollectionsStartAsync();
	}

	render() {
		const { match } = this.props;
		return (
			<div className="shop-page">
				<Route exact path={`${match.path}`} component={CollectionOverivewContainer} />
				<Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatchEvent) => ({
	fetchCollectionsStartAsync: () => dispatchEvent(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
