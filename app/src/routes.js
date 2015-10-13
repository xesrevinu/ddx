/**
 * Created by kee on 15/9/25.
 */
import React from 'react';
import { Route } from 'react-router';
import rootContainer from './containers/rootContainer';
// import indexContainer from './containers/indexContainer';
import loginContainer from './containers/loginContainer';
import createContainer from './containers/createContainer';
import postContainer from './containers/postContainer';

export default ()=>{
  return (
    <Route component={rootContainer}>
      <Route path="/" getComponent={(location, cb)=>{
        require.ensure([], require=>{
          cb(null, require('./containers/indexContainer'));
        });
      }} />
      <Route path="/login" component={loginContainer} />
      <Route path="/post/:_id" component={postContainer} />
      <Route path="/create" component={createContainer} />
    </Route>
  );
};
