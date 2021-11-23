import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { UserProfile, IndexGearsNav, IndexPostsNav } from './templates';
import { ProfileSlideNav, ShowPost } from './components';
import { getPosts } from './reducks/posts/operations';
import { getGears } from './reducks/gears/operations';
import { ScrollToTopOnMount } from './components/Utility';
import { getProfile } from './reducks/profiles/operations';
import { useGaTrackPage } from './Function';

function RouterProfile(props) {
  const dispatch = useDispatch();

  const location = useLocation();
  useGaTrackPage(location.pathname);

  const userId = props.match.params.id;

  useEffect(() => {
    dispatch(getProfile(userId));
    dispatch(getPosts(userId));
    dispatch(getGears(userId));
  }, [userId]);

  return (
    <>
      <ScrollToTopOnMount />
      <div className="profile">
        <div className="profile-main">
          <UserProfile />
          <ProfileSlideNav userId={userId} />
          <Switch>
            <Route path="/:id" exact component={IndexPostsNav} />
            <Route path="/:id/gear" exact component={IndexGearsNav} />
            <Route path="/:id/post/:post_id" exact component={ShowPost} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default RouterProfile;
