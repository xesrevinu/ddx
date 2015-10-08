/**
 * Created by kee on 15/9/25.
 */
import React from 'react'
import { Route, match } from 'react-router'
import rootContainer from 'containers/rootContainer'
import indexContainer from 'containers/indexContainer'
import loginContainer from 'containers/loginContainer'
import createContainer from 'containers/createContainer'
import postContainer from 'containers/postContainer'
export default ()=>{
    return (
        <Route component={rootContainer}>
            <Route path="/" component={indexContainer}></Route>
            <Route path="/login" component={loginContainer}></Route>
            <Route path="/post/:day/:title" component={postContainer}></Route>
            <Route path="/create" component={createContainer}></Route>
        </Route>
    )
}
