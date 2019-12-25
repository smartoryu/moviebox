import Axios from "axios";
import { API_URL } from "../../support/API_URL";

export const RegisterThunkAction = (name, username, password1, password2) => {
  var newUser = { name, username, password2, role: "user" };
  return async dispatch => {
    try {
      var user = await Axios.get(`${API_URL}/users?username=${username}`);
      await dispatch({ type: "REG_RESET" });
      ///// cek apakah username sudah terdaftar
      if (user.data.length) {
        dispatch({ type: "WRONG_USER", payload: "Username already registered!" });
      } else {
        ///// cek apakah kedua password cocok
        if (password1 !== password2) {
          dispatch({ type: "WRONG_PASS", payload: "Password doesn't match!" });
        } else {
          ///// kalo oke semua, gas!
          try {
            await Axios.post(`${API_URL}/users`, newUser);
            dispatch({ type: "REG_SUCCESS" });
          } catch (error) {
            console.log(error);
            dispatch({ type: "REG_ERROR", payload: "Server error!" });
          }
        }
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "REG_ERROR", payload: "Server error!" });
    }
  };
};
