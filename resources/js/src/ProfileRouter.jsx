import React from 'react';
import { Route, Switch } from 'react-router';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from "react-redux";
import { UserProfile, IndexPosts, IndexGearsNav } from './templates';
import { ProfileNav } from './components';


function ProfileRouter(props) {
  const user_id = props.match.params.id;
  const dispatch = useDispatch();

  return (
    <div className="profile">
      <div className="profile-main">
        <UserProfile user_id={user_id} />
        <ProfileNav user_id={user_id} />
        <Switch>
          <Route path="/:id" exact component={IndexPosts} />
          <Route path="/:id/gear" exact component={IndexGearsNav} />
        </Switch>
      </div>
    </div >
  )
}

export default ProfileRouter;
