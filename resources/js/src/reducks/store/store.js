import { 
  createStore as reduxCreateStore,
  applyMiddleware, combineReducers } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { thunk } from 'react-redux';

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history)
      users: 
    })
  ), 
  applyMiddleware(
    routerMiddleware(history), 
    thunk
  )
}