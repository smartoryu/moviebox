import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CryptoJS from "crypto-js";
import { ChangePassThunkAction, UpdatePassThunkAction } from "../redux/action";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class ChangePass extends Component {
  handleChangePass = () => {
    var userId = this.props.AuthId;
    var name = this.props.AuthName;
    var username = this.props.AuthUser;
    var role = this.props.AuthRole;
    var newPass1 = CryptoJS.SHA1(this.newPassword1.value).toString(CryptoJS.enc.Hex);
    var newPass2 = CryptoJS.SHA1(this.newPassword2.value).toString(CryptoJS.enc.Hex);

    if (this.props.AuthDummy) {
      return this.props.UpdatePassThunkAction(userId, name, username, role, newPass1, newPass2);
    } else {
      var oldPass = CryptoJS.SHA1(this.oldPassword.value).toString(CryptoJS.enc.Hex);
      return this.props.ChangePassThunkAction(userId, name, username, role, oldPass, newPass1, newPass2);
    }
  };

  render() {
    const {
      AuthLogin,
      AuthUser,
      AuthDummy,
      RegisterDone,
      WrongOldPass,
      ErrorOldPass,
      WrongNewPass,
      ErrorNewPass
    } = this.props;

    if ((AuthDummy === "" && RegisterDone) || AuthLogin === false) {
      return <Redirect to="/" />;
    }

    console.log(WrongOldPass);
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <form className="form" noValidate>
            <TextField disabled id="outlined-disabled" variant="outlined" margin="normal" fullWidth label={AuthUser} />

            {!AuthDummy ? (
              <TextField // OLD PASSWORD FIELD
                id="old-password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                inputRef={el => (this.oldPassword = el)}
                error={WrongOldPass}
                helperText={ErrorOldPass}
                label="Old Password"
                name="old_password"
                type="password"
                autoComplete="current-password"
              />
            ) : null}

            <TextField // NEW PASSWORD FIELD
              id="new-password1"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              inputRef={el => (this.newPassword1 = el)}
              error={WrongNewPass}
              helperText={ErrorNewPass}
              label="New Password"
              name="new_password1"
              type="password"
              autoComplete="current-password"
            />
            <TextField // RE-ENTER NEW PASSWORD FIELD
              id="new-password2"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              inputRef={el => (this.newPassword2 = el)}
              error={WrongNewPass}
              helperText={ErrorNewPass}
              label="Re-enter New Password"
              name="new_password2"
              type="password"
              autoComplete="current-password"
            />

            <Button // SIGN-IN BUTTON
              onClick={this.handleChangePass}
              fullWidth
              variant="contained"
              color="primary"
              className="mt-3 mb-1">
              Change Password
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    AuthId: state.Auth.id,
    AuthName: state.Auth.name,
    AuthUser: state.Auth.username,
    AuthDummy: state.Auth.dummy,
    AuthRole: state.Auth.role,
    AuthLogin: state.Auth.login,

    RegisterDone: state.Reg.register,
    WrongOldPass: state.Reg.wrongOldPass,
    ErrorOldPass: state.Reg.errorOldPass,
    WrongNewPass: state.Reg.wrongNewPass,
    ErrorNewPass: state.Reg.errorNewPass
  };
};

export default connect(mapStateToProps, { ChangePassThunkAction, UpdatePassThunkAction })(ChangePass);
