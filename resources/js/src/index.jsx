import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import * as History from "history";

import createStore from "./reducks/store/store";
import App from "./App";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import { PasswordReset, PasswordResetToken, Register, SignIn } from "./templates";

const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/login" exact component={SignIn} />
        <Route path="/register" exact component={Register} />
        <Route path="/password/reset" exact component={PasswordReset} />
        <Route path="/password/reset/:token" exact component={PasswordResetToken} />
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);