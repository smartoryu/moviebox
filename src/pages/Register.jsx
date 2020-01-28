/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { RegisterThunkAction } from "../redux/action";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const Register = () => {
  const AuthLogin = useSelector(state => state.Auth.login);
  const RegisterDone = useSelector(state => state.Auth.register);
  const WrongName = useSelector(state => state.Auth.wrongName);
  const WrongUser = useSelector(state => state.Auth.wrongUser);
  const WrongPass = useSelector(state => state.Auth.wrongPass);
  const WrongEmail = useSelector(state => state.Auth.wrongEmail);
  const ErrorName = useSelector(state => state.Auth.errorName);
  const ErrorUser = useSelector(state => state.Auth.errorUser);
  const ErrorPass = useSelector(state => state.Auth.errorPass);
  const ErrorEmail = useSelector(state => state.Auth.errorEmail);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password1: "",
    password2: ""
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // const handleRegister = () => {
  //   var name = this.name.value;
  //   var username = this.username.value.toLowerCase();
  //   var email = this.email.value.toLowerCase();
  //   var password1 = this.password1.value;
  //   var password2 = this.password2.value;
  //   this.props.RegisterThunkAction(name, username, email, password1, password2);
  // };

  const renderCopyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          moviebox
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  if (RegisterDone || AuthLogin) {
    return <Redirect to={"/"} />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className="form" noValidate>
            <TextField // NAME FIELD
              id="register-name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // inputRef={el => (this.name = el)}
              onChange={handleChange("name")}
              error={WrongName}
              helperText={ErrorName}
              label="Name"
              name="name"
              // autoComplete="name"
              autoFocus
            />
            <TextField // EMAIL FIELD
              id="register-email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // inputRef={el => (this.email = el)}
              onChange={handleChange("email")}
              error={WrongEmail}
              helperText={ErrorEmail}
              label="Email"
              name="email"
              type="email"
              // autoComplete="email"
            />
            <TextField // USERNAME FIELD
              id="register-username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // inputRef={el => (this.username = el)}
              onChange={handleChange("username")}
              error={WrongUser}
              helperText={ErrorUser}
              label="Username"
              name="username"
              // autoComplete="username"
            />
            <TextField // PASSWORD FIELD
              id="register-password1"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // inputRef={el => (this.password1 = el)}
              onChange={handleChange("password1")}
              error={WrongPass}
              helperText={ErrorPass}
              label="Password"
              name="password1"
              type="password"
              // autoComplete="current-password"
            />
            <TextField // RE-ENTER PASSWORD FIELD
              id="register-password2"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // inputRef={el => (this.password2 = el)}
              onChange={handleChange("password2")}
              error={WrongPass}
              helperText={ErrorPass}
              label="Re-enter Password"
              name="password2"
              type="password"
              // autoComplete="current-password"
            />

            <Button // SIGN-IN BUTTON
              onClick={() =>
                dispatch(
                  RegisterThunkAction(values.name, values.username, values.email, values.password1, values.password2)
                )
              }
              fullWidth
              variant="contained"
              color="primary"
              className="mt-3 mb-1">
              Register
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login"}
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

// export default connect(
//   state => {
//     return {
//       AuthLogin: state.Auth.login,
//       RegisterDone: state.Auth.register,
//       WrongName: state.Auth.wrongName,
//       WrongUser: state.Auth.wrongUser,
//       WrongPass: state.Auth.wrongPass,
//       WrongEmail: state.Auth.wrongEmail,
//       ErrorName: state.Auth.errorName,
//       ErrorUser: state.Auth.errorUser,
//       ErrorPass: state.Auth.errorPass,
//       ErrorEmail: state.Auth.errorEmail
//     };
//   },
//   { RegisterThunkAction }
// )(Register);

export default Register;
