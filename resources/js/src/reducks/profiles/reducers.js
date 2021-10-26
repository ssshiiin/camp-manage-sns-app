import * as Actions from './actions';
import initialState from '../store/initialState';

export const ProfilesReducer = (state = initialState.profiles, action) => {
  switch (action.type) {
    case Actions.PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
