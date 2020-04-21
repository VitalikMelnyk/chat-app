import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers";
// this is config for redux-persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["RegistrationReducer", "ChatReducer", "LocaleReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export const persistor = persistStore(store);
