import React from 'react';
import { Route, Switch } from 'react-router';
import { Home, Schedule } from './templates/index';
import RouterProfile from './RouterProfile';
import RouterGear from './RouterGear';
import RouterAuth from './RouterAuth';

const Router = () => {
  return (
    <>
      <RouterAuth />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/site" exact component={Schedule} />
        <Route path="/:id/bring" component={RouterGear} />
        <Route path="/:id" component={RouterProfile} />
      </Switch>
    </>
  );
};

export default Router;
