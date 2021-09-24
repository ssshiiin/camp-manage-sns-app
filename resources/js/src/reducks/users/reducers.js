import * as Actions from "./actions"
import initialState from "../store/initialState"

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type){
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload
      }
    case Actions.PROFILE:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.EDIT_APPNAME:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.EDIT_PROFCONTENT:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.EDIT_PROFBOLB:
      return {
        ...state,
        ...action.payload,
      }  
    case Actions.MENU_OPEN:
      return {
        ...state,
        ...action.payload
      }  
    case Actions.ERROR:
      return {
        ...state,
        ...action.payload
      }  
    default: 
      return state
  }
}