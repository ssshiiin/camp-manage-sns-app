import React from "react";
import { Route, Switch } from "react-router";
import { Header, NavHeader } from "./templates";

const HeaderRouter = () => {
  return (
    <Switch>
      <Route path="(/)?" exact render={() => <Header title={"Home"} />} />
      <Route path="/site" exact render={() => <Header title={"Camp Site"} />} />
      <Route path="/:id/bring" exact render={(p) => <NavHeader user_id={p.match.params.id} title={"Gear"} type={"Bring"} />} />
      <Route path="/:id/bring/save" exact render={(p) => <NavHeader user_id={p.match.params.id} title={"Gear"} type={"Bring"} />} />
      <Route path="/:id" render={(p) => <NavHeader user_id={p.match.params.id} type={"Profile"} />} />
    </Switch>
  )
}

export default HeaderRouter;