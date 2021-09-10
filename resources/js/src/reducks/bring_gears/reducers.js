import * as Actions from "./actions";
import initialState from "../store/initialState";

export const BringGearsReducer = (state = initialState.bring_gears, action) => {
  switch (action.type){
    case Actions.BRING_GEARS:
      return {
        ...state,
        ...action.payload
      }
    case Actions.ADD_GEARS:
      return {
        ...state,
        ...action.payload
      }
    case Actions.BRING_COUNT_ALL:
      return {
        ...state,
        ...action.payload
      }
    case Actions.ADD_COUNT_ALL:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}