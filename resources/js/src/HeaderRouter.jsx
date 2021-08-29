import React from "react";
import { Route, Switch } from "react-router";
import { HomeHeader, ProfileHeader } from "./templates";

const HeaderRouter = () => {
  return (
    <Switch>
      <Route path="/:id" exact component={ProfileHeader} />
      <Route path="(/)?" exact component={HomeHeader} />
    </Switch>
  )
}

export default HeaderRouter;