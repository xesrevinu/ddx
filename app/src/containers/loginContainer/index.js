/**
 * Created by kee on 15/9/25.
 */
import React, { Component, PropTypes as Types } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/auth';
import base from '../../styles/app.styl';
import styles from './styles/index.styl';

@connect(state=>({
  auth: state.auth
}))
class LoginContainer extends Component {
  static propTypes = {
    auth: Types.object.isRequired
  }
  componentDidMount() {
    const { dispatch } = this.props;
    this.authActions = bindActionCreators(authActions, dispatch);
  }
  login() {
    let { username, password } = this.refs;
    username = username.value;
    password = password.value;
    this.authActions.login({
      username,
      password,
      time: new Date()
    }, ()=>{
      this.props.history.pushState(null, '/');
    });
  }
  render() {
    return (
      <div className={base.content}>
				<div className={styles.loginForm}>
					<div className={styles.ctrl}>
						<div>{this.props.auth.error}</div>
						<from >
							<div className={styles.input}>
								<label htmlFor="username">用户名</label>
								<input type="text" name="username" ref="username"/>
							</div>
							<div className={styles.input}>
								<label htmlFor="password">密码</label>
								<input type="password" name="password" ref="password"/>
							</div>
							<div className={styles.loginBtn}>
								<input className="btn btn-success"
                       type="submit"
                       onClick={this.login.bind(this)}
                       value="登录" />
							</div>
						</from>
					</div>
				</div>
			</div>
		);
  }
}
export default LoginContainer;
