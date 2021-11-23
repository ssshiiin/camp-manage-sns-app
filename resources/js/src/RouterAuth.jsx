import React from 'react';
import { Route, Switch } from 'react-router';
import { PasswordReset, PasswordResetToken, Register, SignIn } from './templates/Auth';

const RouterAuth = () => {
  return (
    <Switch>
      <Route path="/login" exact component={SignIn} />
      <Route path="/register" exact component={Register} />
      <Route path="/password/reset" exact component={PasswordReset} />
      <Route path="/password/reset/:token" exact component={PasswordResetToken} />
    </Switch>
  );
};

export default RouterAuth;
