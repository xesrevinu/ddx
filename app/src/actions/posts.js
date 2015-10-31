/**
 * Created by kee on 15/9/28.
 */
import {
	POSTS_LOAD,
	POSTS_LOAD_SUCCESS,
	POSTS_LOAD_FAIL,
	POSTS_CREATE,
	POSTS_CREATE_SUCCESS,
	POSTS_CREATE_FAIL,
	POSTS_CHANGE_TYPE,
} from '../constants/posts';
import ajax from './apis';

export function load(showType, callback) {
  return {
    types: [POSTS_LOAD, POSTS_LOAD_SUCCESS, POSTS_LOAD_FAIL],
    promise: ()=> {
      return ajax({
        url: '/posts',
        method: 'GET',
        params: {
          showType: showType
        }
      });
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
      const err = error.data.error || '加载文章失败 ——网络好像出现了问题';
      return err;
    }
  };
}
export function onNewPost(post) {
  return {
    type: POSTS_CREATE_SUCCESS,
    result: post
  };
}
export function createPost(post, callback) {
  return {
    types: [POSTS_CREATE, POSTS_CREATE_SUCCESS, POSTS_CREATE_FAIL],
    promise: ()=> {
      return ajax({
        url: `/posts`,
        method: 'POST',
        data: post
      });
    },
    after: (result)=>{
      if (typeof callback === 'function') {
        callback(result);
      }
    },
    onData: result=>{
      return result.data;
    },
    onError: error=>{
      const err = error.data.error || '创建文章失败 ——网络好像出现了问题';
      return err;
    }
  };
}
