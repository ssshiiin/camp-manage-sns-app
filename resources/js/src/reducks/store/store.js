import { 
  createStore as reduxCreateStore,
  applyMiddleware, combineReducers } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { UsersReducer } from "../users/reducers";
import { PostsReducer } from "../posts/reducers";
import { GearsReducer } from "../gears/reducers";
import { ModalsReducer } from "../modals/reducers";
import { AlertsReducer } from "../Alerts/reducers";

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      posts: PostsReducer,
      gears: GearsReducer,
      modals: ModalsReducer,
      alerts: AlertsReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
}