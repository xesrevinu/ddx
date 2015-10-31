/**
 * Created by kee on 15/9/25.
 */
import React from 'react';
import { Route } from 'react-router';
import rootContainer from './containers/rootContainer';
import indexContainer from './containers/indexContainer';
import loginContainer from './containers/loginContainer';
import createContainer from './containers/createContainer';
import postContainer from './containers/postContainer';

// admin
import adminContainer from './containers/admin/adminContainer';

// let ensureComponent = (component)=> (location, cb)=>{
//   require.ensure([], dd=>{
//     return cb(null, dd(component));
//   });
// };

export default ()=>{
  return (
    <Route>
      <Route component={rootContainer}>
        <Route path="/" component={indexContainer} />
        <Route path="/login" component={loginContainer} />
        <Route path="/post/:_id" component={postContainer} />
        <Route path="/create" component={createContainer} />
      </Route>
      <Route path="/ddx" component={adminContainer} />
    </Route>
  );
};
