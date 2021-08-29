import * as Actions from "./actions"
import initialState from "../store/initialState"

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type){
    case Actions.POSTS:
      return {
        ...state,
        ...action.payload
      }
    case Actions.COUNT_POSTS:
      return {
        ...state,
        ...action.payload
      }
    default: 
      return state
  }
}