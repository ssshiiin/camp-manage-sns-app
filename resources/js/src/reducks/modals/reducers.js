import * as Actions from './actions';
import initialState from '../store/initialState';

export const ModalsReducer = (state = initialState.modals, action) => {
  switch (action.type) {
    case Actions.MODAL_PROF_EDIT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.MODAL_POST_CREATE:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.MODAL_GEAR_CREATE:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.MODAL_POST_EDIT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.MODAL_BRING_EDIT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.MODAL_TEMPLATE_CREATE:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.MODAL_TEMPLATE_USE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
