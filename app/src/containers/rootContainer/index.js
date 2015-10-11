/**
 * Created by kee on 15/9/27.
 */
import React, { Component, PropTypes as Types } from 'react';
// import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Navbar from 'components/navbar';
// import styles from './styles/index.scss';
class RootContainer extends Component {
  static propTypes = {
    location: Types.object.isRequired,
    children: Types.element.isRequired
  }
  render() {
    const { pathname } = this.props.location;
    // <CSSTransitionGroup component="div" transitionName='example'>
    // </CSSTransitionGroup>
    return (
      <div>
        <Navbar path={pathname} />
        {React.cloneElement(this.props.children || <div />, { key: pathname })}
      </div>
    );
  }
}
export default RootContainer;
