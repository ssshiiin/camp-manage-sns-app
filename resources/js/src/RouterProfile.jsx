import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfile, IndexPosts, IndexGearsNav, IndexPostsNav } from './templates';
import { ProfileSlideNav, ShowPost } from './components';
import { getPosts } from './reducks/posts/operations';
import { getGears } from './reducks/gears/operations';
import { ScrollToTopOnMount } from './components/Utility';

function RouterProfile(props) {
  console.log('RouterProfile');
  const dispatch = useDispatch();

  const userId = props.match.params.id;

  useEffect(() => {
    dispatch(getPosts(userId));
    dispatch(getGears(userId));
  }, [userId]);

  return (
    <React.Fragment>
      <ScrollToTopOnMount />
      <div className="profile">
        <div className="profile-main">
          <UserProfile userId={userId} />
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
