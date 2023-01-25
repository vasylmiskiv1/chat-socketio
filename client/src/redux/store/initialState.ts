import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { chatRoom } from "../reducers/rootReducer";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ chatRoom }),
  composeEnhancers(applyMiddleware())
);

export default store;
