import Axios from "axios";
import { API_URL } from "../../support/API_URL";

export const LoginSuccessAction = dataUser => {
  return {
    type: "LOGIN_SUCCESS",
    payload: dataUser
  };
};

export const AddCartAction = count => {
  return {
    type: "ADD_CART",
    payload: count
  };
};

export const ResetPassAction = newPass => {
  return {
    type: "RESET_PASS",
    payload: newPass
  };
};

export const LogoutSuccessAction = () => {
  return {
    type: "LOGOUT_SUCCESS"
  };
};

export const LoginThunkAction = (username, password) => {
  return async dispatch => {
    try {
      var user = await Axios.get(`${API_URL}/users?username=${username}`);
      /// cek apakah username terdaftar
      if (user.data.length) {
        var { data } = await Axios.get(`${API_URL}/users?username=${username}&password=${password}`);
        /// cek apakah username dan password sesuai
        if (data.length) {
          localStorage.setItem("userLogin", data[0].id);
          dispatch(LoginSuccessAction(data[0]));
          /// password salah
        } else {
          dispatch({
            type: "WRONG_PASS",
            payload: "Username/Password doesn't match!"
          });
        }
        /// username tidak terdaftar
      } else {
        dispatch({ type: "WRONG_USER", payload: "Username not registered!" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_ERROR", payload: "Server error!" });
    }
  };
};

export const WrongUserAction = () => {
  return {
    type: "WRONG_USER",
    payload: "Username not registered!"
  };
};
export const WrongPassAction = () => {
  return {
    type: "WRONG_PASS",
    payload: "Username/Password doesn't match!"
  };
};
export const LoginErrorAction = () => {
  return {
    type: "LOGIN_ERROR",
    payload: "Server error!"
  };
};