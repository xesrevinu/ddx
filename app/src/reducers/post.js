/**
 * Created by kee on 15/10/19.
 */
import {
  POST_INFO_LOAD,
  POST_INFO_LOAD_SUCCESS,
  POST_INFO_LOAD_FAIL
} from 'constants/post';

const initialState = {
  loading: false,
  msg: '',
  error: '',
  post: {
    title: '',
    content: '',
    comments: [],
    views: 0,
    about: []
  }
};

export default function post(state = initialState, action = {}) {
  const { type, error, msg, result } = action;
  switch (type) {
    case POST_INFO_LOAD:
      return {
        ...state,
        loading: true
      };
    case POST_INFO_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: msg,
        error: '',
        post: {
          ...result
        }
      };
    case POST_INFO_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        msg: '',
        error: error
      };
    default :
      return state;
  }
  return state;
}
