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

export const UpdatePassThunkAction = (userId, name, username, role, newPass1, newPass2) => {
  var updatePass = { id: userId, name, username, password: newPass2, role };
  return async dispatch => {
    if (newPass1 !== newPass2) {
      dispatch({ type: "WRONG_NEWPASS", payload: "Password doesn't match!" });
    } else if (newPass1 === newPass2) {
      try {
        await Axios.put(`${API_URL}/users/${userId}`, updatePass);
        await dispatch({ type: "REG_SUCCESS" });
        window.location.reload();
      } catch (error) {
        console.log(error);
        dispatch({ type: "REG_ERROR", payload: "Server error!" });
      }
    }
  };
};

export const ChangePassThunkAction = (userId, name, username, role, oldPass, newPass1, newPass2) => {
  var changePass = { userId, name, username, password: newPass2, role };
  return async dispatch => {
    try {
      var { data } = await Axios.get(`${API_URL}/users/${userId}`);
      if (oldPass !== data.password) {
        dispatch({ type: "WRONG_OLDPASS", payload: "Wrong old password" });
      } else if (newPass1 === oldPass) {
        dispatch({ type: "WRONG_NEWPASS", payload: "New password should be different!" });
      } else if (newPass1 === newPass2) {
        try {
          await Axios.put(`${API_URL}/users/${userId}`, changePass);
          await dispatch({ type: "REG_SUCCESS" });
          window.location.reload();
        } catch (error) {
          console.log(error);
          dispatch({ type: "REG_ERROR", payload: "Server error!" });
        }
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "REG_ERROR", payload: "Server error!" });
    }
  };
};
