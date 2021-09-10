import React from "react";
import { Route, Switch } from "react-router";
import { Bring, Home } from "./templates/index";
import ProfileRouter from "./ProfileRouter";
const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/:id/bring" exact component={Bring} />
      <Route path="/:id" component={ProfileRouter} />
    </Switch>
  )
}

export default Router;