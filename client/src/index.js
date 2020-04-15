import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./configureStore";
import App from "./App";
import "../node_modules/aos/dist/aos.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
// console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
