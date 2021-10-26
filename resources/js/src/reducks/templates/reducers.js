import * as Actions from './actions';
import initialState from '../store/initialState';

export const TemplatesReducers = (state = initialState.templates, action) => {
  switch (action.type) {
    case Actions.TEMPLATES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
