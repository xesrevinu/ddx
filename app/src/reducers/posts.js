/**
 * Created by kee on 15/9/28.
 */
import {
	POSTS_LOAD,
	POSTS_LOAD_SUCCESS,
	POSTS_LOAD_FAIL,
	POSTS_CREATE,
	POSTS_CREATE_SUCCESS,
	POSTS_CREATE_FAIL
} from '../constants/posts';

const initialState = {
  posts_loading: false,
  posts_create_loading: false,
  msg: '',
  error: '',
  posts: [],
  modTime: new Date()
};

export default function posts(state = initialState, actions = {} ) {
  const { type, result, error } = actions;
  switch (type) {
    case POSTS_LOAD:
      return {
        ...state,
        posts_loading: true
      };
    case POSTS_LOAD_SUCCESS:
      return {
        ...state,
        posts_loading: false,
        msg: result.msg,
        posts: result.posts
      };
    case POSTS_LOAD_FAIL:
      return {
        ...state,
        posts_loading: false,
        error: error
      };
    case POSTS_CREATE:
      return {
        ...state,
        posts_create_loading: true
      };
    case POSTS_CREATE_SUCCESS:
      return {
        ...state,
        msg: result.msg,
        posts_create_loading: false,
        posts: [
          result.post,
          ...state.posts
        ]
      };
    case POSTS_CREATE_FAIL:
      return {
        ...state,
        posts_create_loading: false,
        error: error
      };
    default:
      return state;
  }
}
