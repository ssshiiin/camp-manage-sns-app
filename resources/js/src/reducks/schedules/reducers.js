import * as Actions from './actions';
import initialState from '../store/initialState';

export const SchedulesReducers = (state = initialState.schedules, action) => {
  switch (action.type) {
    case Actions.GET_SCHEDULE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
