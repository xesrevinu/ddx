/**
 * Created by kee on 15/9/28.
 */
import {
	AUTH_LOAD,
	AUTH_LOAD_SUCCESS,
	AUTH_LOAD_FAIL,
} from '../constants/auth';
import ajax from 'axios';

export function login(data, callback) {
  return {
    types: [AUTH_LOAD, AUTH_LOAD_SUCCESS, AUTH_LOAD_FAIL],
    promise: ()=>{
      return ajax({
        url: '//localhost:3000/api/login',
        method: 'POST',
        data: data
      });
    },
    after: ()=>{
      if (typeof callback === 'function') {
        callback();
      }
    },
    onData: result=>{
      return result.data;
    },
    onError: error=>{
      const err = error.data.error || 'Post info loading error';
      return err;
    }
  };
}
