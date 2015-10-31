/**
 * Created by kee on 15/9/22.
 */
require('styles/app.scss');
import 'normalize.css';
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createHistory } from 'history';
import * as authActions from './actions/auth';
import * as reducers from './reducers/index';
import createMiddle from './middleware/createMiddle';
import createRoutes from './routes';

const history = createHistory();
// const location = history.createLocation(window.location.pathname);
const routes = createRoutes();
const middle = createMiddle();

const DEVTOOLS = false;
let finalCreateStore;
let reduxTools = null;

if (DEVTOOLS) {
  const { devTools, persistState } = require('redux-devtools');
  finalCreateStore = compose(
    applyMiddleware(...middle),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = applyMiddleware(...middle)(createStore);
}

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

if (DEVTOOLS) {
  const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
  // redux 调试工具
  reduxTools = (
    <DebugPanel top left bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  );
}

const init = bindActionCreators(authActions, store.dispatch).init;

const provider = (
  <Provider store={store}>
    <div>
      <Router history={history} children={routes} />
      {reduxTools}
    </div>
  </Provider>
);

render(provider, document.getElementById('app'));

// ajax验证用是否登录
init();
