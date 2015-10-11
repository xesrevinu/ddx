import {
  POST_INFO_LOAD,
  POST_INFO_LOAD_SUCCESS,
  POST_INFO_LOAD_FAIL
} from 'constants/post';
import ajax from 'axios';

export function loadInfo(_id, callback) {
  return {
    types: [POST_INFO_LOAD, POST_INFO_LOAD_SUCCESS, POST_INFO_LOAD_FAIL],
    promise: ()=> ajax.get(`//localhost:3000/api/posts/${_id}`),
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
