/**
 * Created by kee on 15/9/25.
 */
import React from 'react'
import { Route, match } from 'react-router'
import indexContainer from 'containers/indexContainer'
import loginContainer from 'containers/loginContainer'

export default ()=>{
    return (
        <Route>
            <Route path="/" component={indexContainer}></Route>
            <Route path="/login" component={loginContainer}></Route>
        </Route>
    )
}