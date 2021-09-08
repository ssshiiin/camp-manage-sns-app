import * as Actions from "./actions"
import initialState from "../store/initialState"

export const ModalsReducer = (state = initialState.modals, action) => {
  switch (action.type){
    case Actions.MODAL_PROF_EDIT_OPEN:
      return {
        ...state,
        ...action.payload
      }
    case Actions.MODAL_POST_CREATE_OPEN:
      return {
        ...state,
        ...action.payload
      }
    case Actions.MODAL_GEAR_CREATE_OPEN:
      return {
        ...state,
        ...action.payload
      }
    case Actions.MODAL_POST_EDIT_OPEN:
      return {
        ...state,
        ...action.payload
      }
    case Actions.MODAL_GEAR_EDIT_OPEN:
      return {
        ...state,
        ...action.payload
      }
    default: 
      return state
  }
}