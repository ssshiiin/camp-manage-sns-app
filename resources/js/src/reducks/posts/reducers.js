import * as Actions from './actions';
import initialState from '../store/initialState';

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case Actions.POSTS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.PLACE_POSTS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.SHOW_POST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.COUNT_POSTS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_PLACE:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_DAY:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_CONTENT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_IMAGE:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CATCH_ERRORS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
