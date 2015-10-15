/**
 * Created by kee on 15/9/28.
 */
import {
	POSTS_LOAD,
	POSTS_LOAD_SUCCESS,
	POSTS_LOAD_FAIL,
	POSTS_CHANGE_TYPE
} from '../constants/posts';

const initialState = {
  loading: false,
  msg: '',
  error: '',
  posts: [],
  showType: 'All',
  modTime: new Date()
};

export default function posts(state = initialState, actions = {} ) {
  const { type, result } = actions;
  switch (type) {
    case POSTS_LOAD:
      return {
        ...state,
        loading: true
      };
    case POSTS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: actions.msg,
        posts: result
      };
    case POSTS_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.error
      };
    case POSTS_CHANGE_TYPE:
      return {
        ...state,
        showType: actions.showType
      };
    default:
      return state;
  }
  return state;
}
