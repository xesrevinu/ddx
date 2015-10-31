/**
 * Created by kee on 15/9/30.
 */
import React, { Component, PropTypes as Types } from 'react';
import { connect } from 'react-redux';

@connect(state=>({
  auth: state.auth
}))
class AdminContainer extends Component {
  static propTypes = {
    auth: Types.object.isRequired
  }
  render() {
    return (
      <div>
        hello admin
      </div>
    );
  }
}
export default AdminContainer;
