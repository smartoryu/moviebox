import React, { Component } from "react";
import { connect } from "react-redux";
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

// import Axios from "axios";
// import { API_URL } from "../support/API_URL";
// import { LoginSuccessAction, WrongPassAction, WrongUserAction, LoginErrorAction } from "../redux/action";

class Login extends Component {
  handleLogin = () => {
    var username = this.username.value;
    var password = this.password.value;
    this.props.LoginThunkAction(username, password);

    // Axios.get(`${API_URL}/users?username=${username}`)
    //   .then(user => {
    //     if (user.data.length) {
    //       Axios.get(`${API_URL}/users?username=${username}&password=${password}`)
    //         .then(res => {
    //           if (res.data.length) {
    //             localStorage.setItem("userLogin", res.data[0].id);
    //             this.props.LoginSuccessAction(res.data[0]);
    //           } else {
    //             this.props.WrongPassAction();
    //           }
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         });
    //     } else {
    //       this.props.WrongUserAction();
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  renderCopyright = () => {
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

  render() {
    const { AuthLogin, WrongPass, WrongUser, ErrorUser, ErrorPass } = this.props;

    console.log("login page", AuthLogin);
    if (AuthLogin) {
      return <Redirect to={"/"} />;
    }

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
              inputRef={el => (this.username = el)}
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
              inputRef={el => (this.password = el)}
              error={WrongPass}
              helperText={ErrorPass}
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
            />

            <Button // SIGN-IN BUTTON
              onClick={this.handleLogin}
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
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>{this.renderCopyright()}</Box>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    AuthLogin: state.Auth.login,
    WrongUser: state.Auth.errorUser,
    WrongPass: state.Auth.errorPass,
    ErrorUser: state.Auth.errorTextUser,
    ErrorPass: state.Auth.errorTextPass
  };
};

export default connect(mapStateToProps, {
  LoginThunkAction
  // LoginSuccessAction,
  // WrongPassAction,
  // WrongUserAction,
  // LoginErrorAction
})(Login);
