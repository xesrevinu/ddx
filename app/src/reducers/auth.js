/**
 * Created by kee on 15/9/28.
 */
import {
  AUTH_INIT,
  AUTH_INIT_SUCCESS,
  AUTH_INIT_FAIL,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL
} from '../constants/auth';
import clientInitialConfig from '../config/client';

const initialState = {
  loading: false,
  msg: '',
  error: '',
  config: clientInitialConfig,
  logind: false,
  user: {}
};

export default function auth(state = initialState, actions = {}) {
  // result为请求成功时的结果
  // 未成功的请求错误都在erro里
  const { type, result, error } = actions;
  switch (type) {
    case AUTH_INIT:
      return {
        ...state,
        loading: true
      };
    case AUTH_INIT_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: result.msg,
        error: '',
        logind: result.user ? true : false,
        user: result.user || {}
      };
    case AUTH_INIT_FAIL:
      return {
        ...state,
        loading: false,
        error: error
      };
    case AUTH_LOGIN:
      return {
        ...state,
        loading: true
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        logind: true,
        msg: result.msg,
        user: result.user
      };
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: error
      };
    default:
      return state;
  }
}
