import * as Actions from "./actions";
import initialState from "../store/initialState";

export const GearsReducer = (state = initialState.gears, action) => {
  switch (action.type){
    case Actions.GEARS:
      return {
        ...state,
        ...action.payload
      }
    case Actions.COUNT_GEARS:
      return {
        ...state,
        ...action.payload        
      }
    case Actions.CREATE_GEAR_NAME:
      return {
        ...state,
        ...action.payload        
      }
    case Actions.CREATE_CATEGORY:
      return {
        ...state,
        ...action.payload        
      }
    case Actions.CREATE_PURCHASED_DAY:
      return {
        ...state,
        ...action.payload        
      }
    case Actions.CREATE_BRAND:
      return {
        ...state,
        ...action.payload        
      }
    case Actions.CREATE_PRICE:
      return {
        ...state,
        ...action.payload        
      }
    case Actions.CREATE_AMOUNT:
      return {
        ...state,
        ...action.payload        
      }
    case Actions.CREATE_IMAGES:
      return {
        ...state,
        ...action.payload        
      }
    case Actions.CREATE_ERRORS:
      return {
        ...state,
        ...action.payload        
      }
    default: 
      return {
        ...state
      }
  }
}