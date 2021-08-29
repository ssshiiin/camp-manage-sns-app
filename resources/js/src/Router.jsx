import React from "react";
import { Route, Switch } from "react-router";
import { Home, Profile } from "./templates/index";

const Router = () => {
  return (
    <Switch>
      <Route path="(/)?" exact component={Home} />
      <Route path="/:id" exact component={Profile} />
    </Switch>
  )
}

export default Router;