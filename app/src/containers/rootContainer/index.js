/**
 * Created by kee on 15/9/27.
 */
import 'moment/locale/zh-cn';
import React, { Component, PropTypes as Types } from 'react';
// import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Navbar from '../../components/navbar';
import styles from './styles/index.scss';

class RootContainer extends Component {
  static propTypes = {
    children: Types.element.isRequired
  }
  render() {
    // <CSSTransitionGroup component="div" transitionName='example'>
    // </CSSTransitionGroup>
    const { pathname } = this.props.location;
    return (
      <div>
        <Navbar path={pathname} />
        {React.cloneElement(this.props.children || <div />, { key: pathname})}
      </div>
    );
  }
}
export default RootContainer;
