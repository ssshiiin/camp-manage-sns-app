import * as Actions from "./actions";
import initialState from "../store/initialState";

export const BringGearsReducer = (state = initialState.bring_gears, action) => {
  switch (action.type){
    case Actions.GET_BRINGS:
      return {
        ...state,
        ...action.payload
      }
    case Actions.UPDATE_BRINGS:
      return {
        ...state,
        ...action.payload
      }
    case Actions.UPDATE_NOT_BRINGS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}