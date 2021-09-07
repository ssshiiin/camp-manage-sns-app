import * as Actions from "./actions"
import initialState from "../store/initialState"

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type){
    case Actions.POSTS:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SHOW_POST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.COUNT_POSTS:
      return {
        ...state,
        ...action.payload
      }
    case Actions.CREATE_PLACE:
      return {
        ...state,
        ...action.payload
      }
    case Actions.CREATE_DAY:
      return {
      ...state,
      ...action.payload
    }
    case Actions.CREATE_CONTENT:
      return {
      ...state,
      ...action.payload
    }
    case Actions.CREATE_BOLB_URLS:
      return {
      ...state,
      ...action.payload
    }
    case Actions.CREATE_IMAGES:
      return {
      ...state,
      ...action.payload
    }
    default: 
      return state
  }
}