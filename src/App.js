/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { LoginSuccessAction } from "./redux/action";
// import Axios from "axios";

import "./App.css";
import { API_URL } from "./support/API_URL";

import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePass from "./pages/ChangePass";
import ManageUsers from "./pages/ManageUsers";
import ManageMovies from "./pages/ManageMovies";
import MovieDetails from "./pages/MovieDetails";
import ManageStudios from "./pages/ManageStudios";
import NotFound from "./pages/NotFound";

const App = () => {
  const [loading, setLoading] = useState(true);
  const Auth = useSelector(state => state.Auth);
  const dispatch = useDispatch();

  // async componentDidMount() {
  //   try {
  //     var id = localStorage.getItem("userLogin");
  //     if (id) {
  //       var { data } = await Axios.get(`${API_URL}/users/${id}`);
  //       this.props.LoginSuccessAction(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     this.setState({ loading: false });
  //   }
  // }

  return (
    <div>
      <CssBaseline />
      <Header />
      <Switch>
        <Route exact path={"/"} component={Homepage} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/register"} component={Register} />
        <Route exact path={"/change_password"} component={ChangePass} />
        <Route exact path={"/movie_details/:id"} component={MovieDetails} />
        <Route exact path={"/manage_users"} component={ManageUsers} />
        <Route exact path={"/manage_movies"} component={ManageMovies} />
        <Route exact path={"/manage_studios"} component={ManageStudios} />
        <Route exact path={"/404"} component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
