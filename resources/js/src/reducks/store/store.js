import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { UsersReducer } from '../users/reducers';
import { PostsReducer } from '../posts/reducers';
import { GearsReducer } from '../gears/reducers';
import { AlertsReducer } from '../alerts/reducers';
import { MenusReducers } from '../menus/reducers';
import { BringGearsReducer } from '../bring_gears/reducers';
import { TemplatesReducers } from '../templates/reducers';
import { SchedulesReducers } from '../schedules/reducers';
import { Save_gearsReducer } from '../save_gears/reducers';
import { ProfilesReducer } from '../profiles/reducers';

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      posts: PostsReducer,
      gears: GearsReducer,
      alerts: AlertsReducer,
      menus: MenusReducers,
      bring_gears: BringGearsReducer,
      save_gears: Save_gearsReducer,
      templates: TemplatesReducers,
      schedules: SchedulesReducers,
      profiles: ProfilesReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
