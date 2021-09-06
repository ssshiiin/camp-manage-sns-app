import * as Actions from "./actions"
import initialState from "../store/initialState"

export const AlertsReducer = (state = initialState.alerts, action) => {
  switch (action.type){
    case  Actions.STORE:
      return {
        ...state,
        ...action.payload
      }
    case  Actions.SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case  Actions.ALERT_OPEN:
      return {
        ...state,
        ...action.payload
      }
    default: 
      return state
  }
}