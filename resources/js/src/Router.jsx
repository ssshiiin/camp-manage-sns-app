import React from "react";
import { Route, Switch } from "react-router";
import { Home } from "./templates/index";
import ProfileRouter from "./ProfileRouter";
const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/:id" component={ProfileRouter} />
    </Switch>
  )
}

export default Router;