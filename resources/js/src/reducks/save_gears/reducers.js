import * as Actions from './actions';
import initialState from '../store/initialState';

export const Save_gearsReducer = (state = initialState.save_gears, action) => {
  switch(action.type){
    case Actions.SAVE_GEARS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}