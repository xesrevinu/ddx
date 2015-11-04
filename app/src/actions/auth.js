/**
 * Created by kee on 15/9/28.
 */
import {
	AUTH_INIT,
	AUTH_INIT_SUCCESS,
	AUTH_INIT_FAIL,
	AUTH_LOGIN,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_FAIL,
} from '../constants/auth';
import ajax from './apis';
import tokenDecode from 'jwt-decode';

/**
 * @param {String} token
 * */
function decodeUser(token) {
  return tokenDecode(token);
}

export function init(callback) {
  return {
    types: [AUTH_INIT, AUTH_INIT_SUCCESS, AUTH_INIT_FAIL],
    promise: ()=>{
      const token = localStorage.getItem('jwt');
      if (!token) {
        return Promise.resolve({
          data: {
            error: 'no login'
          }
        });
      }
      return ajax({
        url: '/valid',
        method: 'GET',
        headers: {
          'x-access-token': 'Bearer ' + token
        }
      });
    },
    after: ()=>{
      if (typeof callback === 'function') {
        callback();
      }
    },
    onData: result=>{
      const { token, error, msg } = result.data;
      try {
        if (token) {
          return {
            msg,
            user: decodeUser(token).user
          };
        }
        return {
          error
        };
      } catch (e) {
        console.warn('token decode error');
        return Promise.reject({
          data: {
            error: 'token decode error' // 有服务器端返回的token，但解析出错，也就是有问题的token
          }
        });
      }
    },
    onError: error=>{
      const err = error.data.error || '初始化失败 ——网络好像出现了问题';
			// 验证不通过，没必要将错误显示到页面上
      return err;
    }
  };
}

export function login(data, callback) {
  return {
    types: [AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL],
    promise: ()=>{
      return ajax({
        url: '/login',
        method: 'POST',
        body: data
      });
    },
    after: ()=>{
      if (typeof callback === 'function') {
        callback();
      }
    },
    onData: result=>{
      const { token, msg } = result.data;
      const { user } = decodeUser(token);
      try {
        localStorage.setItem('jwt', token);
        return {
          msg,
          user: user
        };
      } catch (e) {
        console.warn('token decode error');
        return Promise.reject({
          data: {
            error: '登陆失败， 请重新尝试' // token decode error
          }
        });
      }
    },
    onError: error=>{
      const err = error.data.error || '登陆失败，请重新尝试 ——网络好像出现了问题';
      return err;
    }
  };
}
