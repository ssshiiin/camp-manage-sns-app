import * as Actions from './actions';
import initialState from '../store/initialState';

export const ProfilesReducer = (state = initialState.profiles, action) => {
  switch (action.type) {
    case Actions.PROFILES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_APP_NAME:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_PROF_CONTENT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_IMAGE:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CATCH_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
