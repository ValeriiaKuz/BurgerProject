import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./components/app/app";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers/reducers";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socket-middleware";
import { wsUrl } from "./utils/types";

const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl)))
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>
  // </React.StrictMode>
);

reportWebVitals();
