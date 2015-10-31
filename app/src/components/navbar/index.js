/**
 * Created by kee on 15/9/25.
 */
import React, { Component, PropTypes as Types } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cx from 'classnames';
import styles from './styles/navbar.scss';

@connect(state=>({
  auth: state.auth
}))
class Navbar extends Component {
  static propTypes = {
    auth: Types.object.isRequired,
    path: Types.string.isRequired
  };
  render() {
    const show = cx({
      [styles.show]: this.props.path === '/login'
    });
    let nav = null;
    if (this.props.auth.loading) {
      nav = (
        <li key={0}>
          <a herf="javascript:void(0)">loading</a>
        </li>
      );
    } else {
      if (this.props.auth.logind) {
        nav = (
          <li>
            <Link className={styles.create} to="/create"> + </Link>
          </li>
        );
      } else {
        nav = (
          <li className={show} key={0}>
            <Link className={styles.login} to="/login"> 登陆</Link>
          </li>
        );
      }
    }
    return (
  		<div className={styles.navbar}>
        <span className={styles.logo}>
          <Link to="/"> Ddx </Link>
        </span>
  			<div className={styles.left}>
          <ul>
          {nav}
          </ul>
  			</div>
  		</div>
		);
  }
}
export default Navbar;
