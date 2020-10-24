import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import auth from "../auth/auth.helper";

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#ff4081" };
  else return { color: "#ffffff" };
};

const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h4" color="inherit">
        Project Skeleton
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, "/")}>
          <HomeIcon fontSize="large" />
        </IconButton>
      </Link>
      <Link to="/users">
        <Button style={isActive(history, "/users")}>Users</Button>
      </Link>
      {!auth.isAuthenticated() && (
        <span>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign in</Button>
          </Link>
          <Link to="/signUp">
            <Button style={isActive(history, "/signUp")}>Sign up</Button>
          </Link>
        </span>
      )}
    </Toolbar>
  </AppBar>
));

export default Menu;
