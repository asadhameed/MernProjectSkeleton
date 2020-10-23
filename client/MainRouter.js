import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import SignUp from "./user/signup";

const MainRouter = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
};

export default MainRouter;
