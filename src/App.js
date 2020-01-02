import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import { LoginSuccessAction } from "./redux/action";

import "./App.css";
import { API_URL } from "./support/API_URL";

import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePass from "./pages/ChangePass";
import MovieDetails from "./pages/MovieDetails";
import ManageUsers from "./pages/ManageUsers";
import ManageStudios from "./pages/ManageStudios";
import NotFound from "./pages/NotFound";

class App extends Component {
  state = {
    loading: true
  };

  async componentDidMount() {
    try {
      var id = localStorage.getItem("userLogin");
      if (id) {
        var { data } = await Axios.get(`${API_URL}/users/${id}`);
        this.props.LoginSuccessAction(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact path={"/"} component={Homepage} />
          <Route path={"/login"} component={Login} />
          <Route path={"/register"} component={Register} />
          <Route path={"/change_password"} component={ChangePass} />
          <Route path={"/movie_details/:id"} component={MovieDetails} />
          <Route path={"/manage_users"} component={ManageUsers} />
          <Route path={"/manage_studios"} component={ManageStudios} />
          <Route path={"/404"} component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Auth: state.Auth
  };
};

export default connect(mapStateToProps, { LoginSuccessAction })(App);
