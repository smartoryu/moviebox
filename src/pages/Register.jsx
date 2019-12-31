import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CryptoJS from "crypto-js";
import { RegisterThunkAction } from "../redux/action";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class Register extends Component {
  handleRegister = () => {
    console.log("masuk");

    var name = this.name.value;
    var username = this.username.value.toLowerCase();
    var password1 = CryptoJS.SHA1(this.password1.value).toString(CryptoJS.enc.Hex);
    var password2 = CryptoJS.SHA1(this.password2.value).toString(CryptoJS.enc.Hex);
    console.log(password1);
    console.log(password2);
    this.props.RegisterThunkAction(name, username, password1, password2);
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
    const { AuthLogin, RegisterDone, WrongPass, WrongUser, ErrorUser, ErrorPass } = this.props;
    // console.log(RegisterDone);

    if (RegisterDone || AuthLogin) {
      return <Redirect to={"/"} />;
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className="form" noValidate>
            <TextField // USERNAME FIELD
              id="register-name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              inputRef={el => (this.name = el)}
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField // USERNAME FIELD
              id="register-username"
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
            />
            <TextField // PASSWORD FIELD
              id="register-password1"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              inputRef={el => (this.password1 = el)}
              error={WrongPass}
              helperText={ErrorPass}
              label="Password"
              name="password1"
              type="password"
              autoComplete="current-password"
            />
            <TextField // RE-ENTER PASSWORD FIELD
              id="register-password2"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              inputRef={el => (this.password2 = el)}
              error={WrongPass}
              helperText={ErrorPass}
              label="Re-enter Password"
              name="password2"
              type="password"
              autoComplete="current-password"
            />

            <Button // SIGN-IN BUTTON
              onClick={this.handleRegister}
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
        <Box mt={8}>{this.renderCopyright()}</Box>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    AuthLogin: state.Auth.login,
    RegisterDone: state.Reg.register,
    WrongUser: state.Reg.wrongUser,
    ErrorUser: state.Reg.errorUser,
    WrongPass: state.Reg.wrongPass,
    ErrorPass: state.Reg.errorPass
  };
};

export default connect(mapStateToProps, { RegisterThunkAction })(Register);
