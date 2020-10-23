import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  makeStyles,
  CardActions,
  Icon,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import { createUser } from "./user.api";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default function () {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    open: false,
    error: "",
  });
  //   const [errorTextFiled, setErrorTextFiled] = useState({
  //     name: "",
  //     email: "",
  //     password: "",
  //     passwordConfirmation: "",
  //   });
  const handleChange = (event) => {
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
  };
  const clickSubmit = async (event) => {
    event.preventDefault();

    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      passwordConfirmation: values.passwordConfirmation || undefined,
    };

    const { data } = await createUser(user);
    if (data.error) {
      console.log(data.error);
      //   const { errors } = data.error;
      //   errors.forEach((item) => {
      //     const { param, msg } = item;
      //     console.log(param, msg);
      //     this.setErrorTextFiled({ ...errorTextFiled, [param]: msg });
      //   });
      setValues({ ...values, error: "User Input Error" });
    } else setValues({ ...values, error: "", open: true });
  };
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>
          <TextField
            id="name"
            label="Name"
            value={values.name}
            className={classes.textField}
            onChange={handleChange}
            margin="normal"
          />

          <br />
          <TextField
            id="email"
            label="Email"
            type="email"
            value={values.email}
            className={classes.textField}
            onChange={handleChange}
            margin="normal"
          />
          {}
          <br />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={values.password}
            className={classes.textField}
            onChange={handleChange}
            margin="normal"
          />
          <br />
          <TextField
            id="passwordConfirmation"
            label="Password confirmation"
            type="password"
            value={values.passwordConfirmation}
            className={classes.textField}
            onChange={handleChange}
            margin="normal"
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                Error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={clickSubmit}
          >
            Sign Up
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {values.email} Account Create Successful
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/singin">
            <Button color="primary" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
