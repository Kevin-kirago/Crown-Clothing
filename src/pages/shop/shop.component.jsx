import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";

import "./shop.styles.scss";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

import Spinner from "../../components/spinner/spinner.component";

import { firestore, converCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

const CollectionOverviewSpinner = Spinner(CollectionOverview);
const CollectionPageSpinner = Spinner(CollectionPage);

// props match are acquired from app js since shoppage is nested in a route
class ShopPage extends React.Component {
	state = {
		loading: true,
	};
	unsubscribeFromSnapshot = null;

	componentDidMount() {
		const { updateCollection } = this.props;

		const collectionRef = firestore.collection("collections");

		/*  ----- fetch API -----  */
		fetch(`https://firestore.googleapis.com/v1/projects/crown-clothing-9f7bf/databases/(default)/documents/collections`)
			.then((res) => res.json())
			.then((collections) => console.log(collections));

		/*  ----- PROMISE PATTERN -----  */

		collectionRef.get().then((snapShot) => {
			const collectionsMap = converCollectionsSnapshotToMap(snapShot);
			updateCollection(collectionsMap);
			this.setState({ loading: false });
		});

		/*  ----- OBSERVER PATTERN -----  */
		/*
			collectionRef.onSnapshot(async (snapShot) => {
				const collectionsMap = converCollectionsSnapshotToMap(snapShot);
				updateCollection(collectionsMap);
				this.setState({ loading: false });
			});
		*/
	}

	render() {
		const { match } = this.props;
		const { loading } = this.state;
		return (
			<div className="shop-page">
				<Route exact path={`${match.path}`} render={(props) => <CollectionOverviewSpinner isLoading={loading} {...props} />} />
				<Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageSpinner isLoading={loading} {...props} />} />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatchEvent) => ({
	updateCollection: (collections) => dispatchEvent(updateCollections(collections)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
