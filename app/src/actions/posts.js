/**
 * Created by kee on 15/9/28.
 */
import {
	POSTS_LOAD,
	POSTS_LOAD_SUCCESS,
	POSTS_LOAD_FAIL,
	POSTS_CHANGE_TYPE
} from '../constants/posts';
import ajax from 'axios';

export function load(showType, callback) {
  return {
    types: [POSTS_LOAD, POSTS_LOAD_SUCCESS, POSTS_LOAD_FAIL],
    promise: ()=> {
      return ajax({
        url: '//localhost:3000/api/posts',
        method: 'GET',
        params: {
          showType: showType
        }
      });
    },
    before: ({/* dispatch, getState */})=>{
			// dispatch global loading
			// 非异步得手动调用fn
			// fn()
			// setTimeout(()=>{
			// 	console.log('before');
			// 	fn(1)
			// },2000)
    },
    after: ()=>{
      if (typeof callback === 'function') {
        callback();
      }
    },
    onData: result=>{
      const data = result.data;
      return data;
    },
    onError: error=>{
      const err = error.data.error || 'Posts loading error';
      return err;
    }
  };
}
export function changeType(name) {
  return {
    type: POSTS_CHANGE_TYPE,
    showType: name
  };
}
