import * as Actions from "./actions"
import initialState from "../store/initialState"

export const ModalsReducer = (state = initialState.modals, action) => {
  switch (action.type){
    case Actions.MODAL_PROF_EDIT_OPEN:
      return {
        ...state,
        ...action.payload
      }
    default: 
      return state
  }
}