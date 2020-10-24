import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Icon,
} from "@material-ui/core";
import useStyles from "../css/components.class";
import { signIn } from "./auth.api";
//import "../css/components.css";
export default function () {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handelChange = (event) => {
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
  };
  const clickSignin = async (event) => {
    event.preventDefault();
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    const response = await signIn(user);
    const { data } = response;
    if (data.error) {
      if (data.error.errors)
        setValues({ ...values, error: "User input is invalid" });
      else setValues({ ...values, error: data.error });
    } else {
      console.log(data);
      setValues({ ...values, error: "sing in" });
    }
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Sign in
        </Typography>
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          variant="filled"
          onChange={handelChange}
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          variant="filled"
          className={classes.textField}
          onChange={handelChange}
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
          className={classes.submit}
          variant="contained"
          onClick={clickSignin}
        >
          Sign in
        </Button>
      </CardActions>
    </Card>
  );
}
