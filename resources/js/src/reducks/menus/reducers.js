import * as Actions from "./actions";
import initialState from "../store/initialState";

export const MenusReducers = (state = initialState.menus, actions) => {
  switch (actions.type){
    case Actions.POST_NAV:
      return {
        ...state,
        ...actions.payload
      }
    case Actions.GEAR_NAV:
      return {
        ...state,
        ...actions.payload
      }
    default:
      return state
  }
}