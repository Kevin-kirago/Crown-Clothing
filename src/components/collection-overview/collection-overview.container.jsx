import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import spinner from "../spinner/spinner.component";
import CollectionOverview from "./collection-overview.component";

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsCollectionFetching,
});

// const CollectionOverivewContainer = connect(mapStateToProps)(spinner(CollectionOverview));
const CollectionOverivewContainer = compose(connect(mapStateToProps), spinner)(CollectionOverview);
export default CollectionOverivewContainer;
