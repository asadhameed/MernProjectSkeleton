import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import SignUp from "./user/signup";
import SignIn from "./auth/auth";

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route Path="/signin" component={SignIn} />
    </Switch>
  );
};

export default MainRouter;
