import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as History from 'history';

import createStore from './reducks/store/store';
import App from './App';
import { ConnectedRouter } from 'connected-react-router';

const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
