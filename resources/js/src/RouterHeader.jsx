import React, { memo } from 'react';
import { Route, Switch } from 'react-router';
import { NavHeader, NormalHeader } from './components/Header';

const RouteHeader = memo(() => {
  console.log('header');
  return (
    <Switch>
      <Route path="(/)?" exact render={() => <NormalHeader title={'Home'} />} />
      <Route path="/site" exact render={() => <NormalHeader title={'Camp Site'} type={'Site'} />} />
      <Route
        path="/:id/bring"
        exact
        render={(p) => <NavHeader user_id={p.match.params.id} title={'Gear'} type={'Bring'} />}
      />
      <Route
        path="/:id/bring/save"
        exact
        render={(p) => <NavHeader user_id={p.match.params.id} title={'Gear'} type={'Bring'} />}
      />
      <Route path="/:id" render={(p) => <NavHeader userId={p.match.params.id} type={'Profile'} />} />
    </Switch>
  );
});

export default RouteHeader;
