import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { chatRoomReducer } from "../reducers/rootReducer";
import { persistStore, persistReducer } from "redux-persist"; 
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persist-key",
  storage,
};

const chat = persistReducer(persistConfig, chatRoomReducer);

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ chat }),
  composeEnhancers(applyMiddleware())
);

const persistor = persistStore(store);

export default store;
export {persistor};
