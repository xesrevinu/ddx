/**
 * Created by kee on 15/9/22.
 */
require('styles/app.css')
import 'normalize.css'
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createHistory, useBasename } from 'history'
import * as reducers from 'reducers/index'
import createMiddle from 'middleware/createMiddle'
import createRoutes from './routes'
import 'moment/locale/zh-cn'

const port = 4000;
const host = `//localhost:${port}`

const history = useBasename(createHistory)({
  basename: host
})
const location = history.createLocation(window.location.pathname);
const routes = createRoutes();
const middle = createMiddle();

let DEVTOOLS = false;
let finalCreateStore;

if (DEVTOOLS) {
    const { devTools, persistState } = require('redux-devtools');
    finalCreateStore = compose(
        applyMiddleware(...middle),
        devTools(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)
} else {
    finalCreateStore = applyMiddleware(...middle)(createStore)
}

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

render(<Provider store={store}>
        {<Router history={history} children={routes} />}
    </Provider>, document.getElementById('app') );

/*
match({ routes, location }, (error, redirectLocation, renderProps) => {


})*/
