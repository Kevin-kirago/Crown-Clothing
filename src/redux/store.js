import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const saga = createSagaMiddleware();

const middlewares = [saga];
// while in development log activities
if (process.env.NODE_ENV === "development") {
	middlewares.push(logger);
}

const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		  })
		: compose;

const enhancer = composeEnhancers(
	applyMiddleware(...middlewares)
	// other store enhancers if any
);
export const store = createStore(rootReducer, enhancer);

saga.run(rootSaga);

export const persistor = persistStore(store);
export default { store, persistor };
