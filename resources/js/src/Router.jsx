import React from 'react';
import { Route, Switch } from 'react-router';
import { Home, Schedule } from './templates/index';
import RouterProfile from './RouterProfile';
import RouterGear from './RouterGear';
import { PasswordReset, PasswordResetToken, Register, SignIn } from './templates/Auth';

const Router = () => {
  return (
    <>
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
    </>
  );
};

export default Router;
