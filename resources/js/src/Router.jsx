import React from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { Home, Schedule } from './templates/index';
import RouterProfile from './RouterProfile';
import RouterGear from './RouterGear';
const Router = () => {
  const { listen } = useHistory();

  useEffect(() => {
    const unlisten = listen((location) => {
      if (!window.gtag) return;
      if (!trackingId) {
        console.log(
          'Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`.'
        );
        return;
      }
      window.gtag('config', trackingId, { page_path: location.pathname });
    });
    return unlisten;
  }, [trackingId, listen]);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/site" exact component={Schedule} />
      <Route path="/:id/bring" component={RouterGear} />
      <Route path="/:id" component={RouterProfile} />
    </Switch>
  );
};

export default Router;
