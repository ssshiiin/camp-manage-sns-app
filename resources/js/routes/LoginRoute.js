import React from "react";
import { Route, Redirect } from "react-router-dom";

function LoginRoute(props) {
    console.log(props)
    return props.id == props.user.id ? <Redirect to="/" /> : <Route component={props.route} />;
}

export default LoginRoute;