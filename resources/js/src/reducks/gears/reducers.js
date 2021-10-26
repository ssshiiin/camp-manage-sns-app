import * as Actions from './actions';
import initialState from '../store/initialState';

export const GearsReducer = (state = initialState.gears, action) => {
  switch (action.type) {
    case Actions.GEARS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.COUNT_GEARS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
