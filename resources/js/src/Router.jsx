import React from "react";
import { Route, Switch } from "react-router";
import { Bring, Home, Schedule } from "./templates/index";
import ProfileRouter from "./ProfileRouter";
const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/:id/schedule" exact component={Schedule} />
      <Route path="/:id/bring" exact component={Bring} />
      <Route path="/:id" component={ProfileRouter} />
    </Switch>
  )
}

export default Router;