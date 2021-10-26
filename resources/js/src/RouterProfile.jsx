import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfile, IndexPosts, IndexGearsNav, IndexPostsNav } from './templates';
import { ProfileSlideNav, ShowPost } from './components';
import { getPosts } from './reducks/posts/operations';
import { getGears } from './reducks/gears/operations';
import { ScrollToTopOnMount } from './components/Utility';
import { getProfile } from './reducks/profiles/operations';
import { Loading } from './components/Loading';

function RouterProfile(props) {
  console.log('RouterProfile');
  const dispatch = useDispatch();

  const userId = props.match.params.id;

  useEffect(() => {
    const startTime = Date.now();
    dispatch(getProfile(userId));
    dispatch(getPosts(userId));
    dispatch(getGears(userId));
    const endTime = Date.now();
    console.log('time profile', endTime - startTime);
  }, [userId]);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default RouterProfile;
