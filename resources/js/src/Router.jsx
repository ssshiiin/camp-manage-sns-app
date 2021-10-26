import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';
import { Home, Schedule } from './templates/index';
import RouterProfile from './RouterProfile';
import RouterGear from './RouterGear';
import { PasswordReset, PasswordResetToken, Register, SignIn } from './templates/Auth';
import { signInUser } from './reducks/users/operations';

const Router = () => {
  const dispatch = useDispatch();
  const { listen } = useHistory();
  const trackingId = process.env.MIX_TRACKING_ID;

  useEffect(() => {
    const unlisten = listen((location) => {
      if (!window.gtag) return;
      if (!trackingId) {
        console.log('Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`.');
        return;
      }
      window.gtag('config', trackingId, { page_path: location.pathname });
    });
    return unlisten;
  }, [trackingId, listen]);

  return (
    <Switch>
      <Route path="/login" exact component={SignIn} />
      <Route path="/register" exact component={Register} />
      <Route path="/password/reset" exact component={PasswordReset} />
      <Route path="/password/reset/:token" exact component={PasswordResetToken} />
      <Route path="/" exact component={Home} />
      <Route path="/site" exact component={Schedule} />
      <Route path="/:id/bring" component={RouterGear} />
      <Route path="/:id" component={RouterProfile} />
    </Switch>
  );
};

export default Router;
