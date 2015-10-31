/**
 * Created by kee on 15/10/19.
 */
import {
  POST_INFO_LOAD,
  POST_INFO_LOAD_SUCCESS,
  POST_INFO_LOAD_FAIL,
  POST_COMMENT_CREATE_LOAD,
  POST_COMMENT_CREATE_SUCCESS,
  POST_COMMENT_CREATE_FAIL
} from 'constants/post';

const initialState = {
  post_loading: false,
  msg: '',
  error: '',
  create_comment_loading: false,
  create_comment_error: '',
  post: {
    title: '',
    content: '',
    comments: [],
    views: 0,
    about: []
  }
};

export default function post(state = initialState, action = {}) {
  const { type, error, result } = action;
  switch (type) {
    case POST_INFO_LOAD:
      return {
        ...state,
        post_loading: true,
        post: {
          title: '',
          content: '',
          comments: [],
          views: 0,
          about: []
        }
      };
    case POST_INFO_LOAD_SUCCESS:
      return {
        ...state,
        post_loading: false,
        msg: result.msg,
        error: '',
        post: result.post
      };
    case POST_INFO_LOAD_FAIL:
      return {
        ...state,
        post_loading: false,
        msg: '',
        error: error
      };
    case POST_COMMENT_CREATE_LOAD:
      return {
        ...state,
        create_comment_loading: true
      };
    case POST_COMMENT_CREATE_SUCCESS:
      const originPost = state.post;
      return {
        ...state,
        create_comment_loading: false,
        create_comment_error: '',
        post: {
          ...originPost,
          comments: [
            result,
            ...state.post.comments
          ]
        }
      };
    case POST_COMMENT_CREATE_FAIL:
      return {
        ...state,
        create_comment_loading: false,
        create_comment_error: error
      };
    default:
      return state;
  }
}
