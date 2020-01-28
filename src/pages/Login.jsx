/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { LoginThunkAction } from "../redux/action";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const Login = () => {
  const AuthLogin = useSelector(state => state.Auth.login);
  const WrongUser = useSelector(state => state.Auth.wrongUser);
  const WrongPass = useSelector(state => state.Auth.wrongPass);
  const ErrorUser = useSelector(state => state.Auth.errorUser);
  const ErrorPass = useSelector(state => state.Auth.errorPass);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const renderCopyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          moviebox{" "}
        </Link>
        {new Date().getFullYear()}
      </Typography>
    );
  };

  if (AuthLogin) {
    return <Redirect to={"/"} />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="form" noValidate>
            <TextField // USERNAME FIELD
              id="login-username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange("username")}
              error={WrongUser}
              helperText={ErrorUser}
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />

            <TextField // PASSWORD FIELD
              id="login-password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange("password")}
              error={WrongPass}
              helperText={ErrorPass}
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
            />

            <Button // SIGN-IN BUTTONq
              onClick={() => dispatch(LoginThunkAction(values.username, values.password))}
              fullWidth
              variant="contained"
              color="primary"
              className="mt-3 mb-1">
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>{renderCopyright()}</Box>
      </Container>
    );
  }
};

export default Login;
