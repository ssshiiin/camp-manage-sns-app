import { 
  createStore as reduxCreateStore,
  applyMiddleware, combineReducers } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { UsersReducer } from "../users/reducers";
import { PostsReducer } from "../posts/reducers";

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      posts: PostsReducer
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
}