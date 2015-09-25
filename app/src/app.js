/**
 * Created by kee on 15/9/22.
 */
import React from 'react'
import thunk from 'redux-thunk'
import { Router, match } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import createLocation from 'history/lib/createLocation'
import createRoutes from './routes'

let history = createBrowserHistory({
    //queryKey: '_key'
})
let routes = createRoutes()
let location = createLocation(window.location.pathname)

React.render(<Router history={history} children={routes} />, document.getElementById('app') );

/*
match({ routes, location }, (error, redirectLocation, renderProps) => {


})*/
