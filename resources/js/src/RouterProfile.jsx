import React from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { UserProfile, IndexPosts, IndexGearsNav, IndexPostsNav } from './templates';
import { ProfileSlideNav, ShowPost } from './components';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { SuccessAction } from './reducks/alerts/actions';
import ScrollToTopOnMount from './templates/ScrollToTopOnMount';



function RouterProfile(props) {
  const user_id = props.match.params.id;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const success = selector.modals.success;

  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(SuccessAction({
      success: false
    }))
  };

  return (
    <React.Fragment>
      <ScrollToTopOnMount />
      <div className="profile">
        <div className="profile-main">
          <UserProfile user_id={user_id} />
          <ProfileSlideNav user_id={user_id} />
          <Switch>
            <Route path="/:id" exact component={IndexPostsNav} />
            <Route path="/:id/gear" exact component={IndexGearsNav} />
            <Route path="/:id/post/:post_id" exact component={ShowPost} />
          </Switch>
        </div>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccessClose}>
          <Alert onClose={handleSuccessClose} severity="success">
            保存しました
          </Alert>
        </Snackbar>
      </div >
    </React.Fragment>
  )
}

export default RouterProfile;