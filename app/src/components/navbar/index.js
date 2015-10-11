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
    return (
  		<div className={styles.navbar}>
        <span className={styles.logo}>
          <Link to="/"> Ddx </Link>
        </span>
  			<div className={styles.left}>
          <ul>
            {this.props.auth.user.logind ? (
              <li>
                <Link className={styles.create} to="/create"> + </Link>
              </li>
            ) : (
              <li className={show}>
                <Link className={styles.login} to="/login"> 登陆</Link>
              </li>
            )}
          </ul>
  			</div>
  		</div>
		);
  }
}
export default Navbar;
