import React from "react";
import { Route, Switch } from "react-router";
import { BringHeader, HomeHeader, ProfileHeader } from "./templates";

const HeaderRouter = () => {
  return (
    <Switch>
      <Route path="(/)?" exact component={HomeHeader} />
      <Route path="/:id/bring" exact component={BringHeader} />
      <Route path="/:id" component={ProfileHeader} />
    </Switch>
  )
}

export default HeaderRouter;