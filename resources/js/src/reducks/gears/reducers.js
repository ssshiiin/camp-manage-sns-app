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
    case Actions.CHANGE_GEAR_NAME:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_CATEGORY:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_PURCHASED_DAY:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_BRAND:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_PRICE:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_AMOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CHANGE_IMAGE:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CATCH_ERRORS:
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
