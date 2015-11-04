import {
  POST_INFO_LOAD,
  POST_INFO_LOAD_SUCCESS,
  POST_INFO_LOAD_FAIL,
  POST_COMMENT_CREATE_LOAD,
  POST_COMMENT_CREATE_SUCCESS,
  POST_COMMENT_CREATE_FAIL
} from 'constants/post';
import ajax from './apis';

export function loadInfo(_id, callback) {
  return {
    types: [POST_INFO_LOAD, POST_INFO_LOAD_SUCCESS, POST_INFO_LOAD_FAIL],
    promise: ()=> ajax({
      url: `/posts/${_id}`,
      method: 'GET'
    }),
    after: ()=>{
      if (typeof callback === 'function') {
        callback();
      }
    },
    onData: result=>{
      return result.data;
    },
    onError: error=>{
      const err = error.data.error || '文章信息加载失败 ——网络好像出现了问题';
      return err;
    }
  };
}
export function onNewComment(comment) {
  return {
    type: POST_COMMENT_CREATE_SUCCESS,
    result: comment
  };
}
export function createComment(comment, callback) {
  return {
    types: [POST_COMMENT_CREATE_LOAD, POST_COMMENT_CREATE_SUCCESS, POST_COMMENT_CREATE_FAIL],
    promise: ()=>{
      return ajax({
        url: `/comments/${comment.post_id}`,
        method: 'POST',
        body: comment
      });
    },
    before: ()=>{
      if (!comment.from) {
        return Promise.reject({
          data: {
            error: '填写不完整，请重试'
          }
        });
      }
    },
    after: ()=>{
      if (typeof callback === 'function') {
        callback();
      }
    },
    onData: ()=>{
      // 返回提交的comment
      return comment;
    },
    onError: error=>{
      const err = error.data.error || '发表评论失败 ——网络好像出现了问题';
      return err;
    }
  };
}
