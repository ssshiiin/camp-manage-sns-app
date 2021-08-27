import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import * as History from "history";

import createStore from "./reducks/store/store";
import App from "./App";
import { connectRouter } from "connected-react-router";

const history = History.createBrowserHistory();
export const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <connectRouter history={history}>
      <App />
    </connectRouter>
  </Provider>,
  document.getElementById('root')
);