import Axios from "axios";
import { API_URL } from "../../support/API_URL";
import Swal from "sweetalert2";

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

export const LogoutSuccessAction = () => {
  return {
    type: "LOGOUT_SUCCESS"
  };
};

export const LoginThunkAction = (username, password) => {
  return async dispatch => {
    try {
      var user = await Axios.get(`${API_URL}/users?username=${username}`);
      // console.log(user.data[0]["suspend"]);

      /// cek apakah username terdaftar
      if (user.data.length) {
        /// cek apakah user di-suspend
        if (user.data[0]["suspend"]) {
          dispatch({ type: "SUSPENDED", payload: "Your account was suspended" });
        } else {
          try {
            var pass = await Axios.get(`${API_URL}/users?username=${username}&password=${password}`);
            try {
              var dummy = await Axios.get(`${API_URL}/users?username=${username}&dummy=${password}`);
            } catch (error) {
              console.log(error);
            }
          } catch (error) {
            console.log(error);
          }
        }

        /// cek apakah akun sudah ada passwordnya
        if (pass.data.length) {
          localStorage.setItem("userLogin", pass.data[0].id);
          dispatch(LoginSuccessAction(pass.data[0]));
          /// cek apakah akun masih punya password dummy
        } else if (dummy.data.length) {
          localStorage.setItem("userLogin", dummy.data[0].id);
          dispatch(LoginSuccessAction(dummy.data[0]));
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

export const SuspendThunkAction = dataUser => {
  return async dispatch => {
    var { value } = await Swal.fire({
      title: `Are you sure suspending ${dataUser.name} (${dataUser.username})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      reverseButtons: true
    });
    if (value) {
      try {
        var user = await Axios.get(`${API_URL}/users?id=${dataUser.id}`);
        var suspendedUser = { ...user.data[0], suspend: true };
        try {
          await Axios.put(`${API_URL}/users/${dataUser.id}`, suspendedUser);
          Swal.fire("Suspended", "", "success");
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export const UnsuspendThunkAction = dataUser => {
  return async () => {
    var { value } = await Swal.fire({
      title: `Are you sure suspending ${dataUser.name} (${dataUser.username})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      reverseButtons: true
    });
    if (value) {
      try {
        var user = await Axios.get(`${API_URL}/users?id=${dataUser.id}`);
        var suspendUser = { ...user.data[0], suspend: false };
        if (user.data[0]["suspend"]) {
          try {
            await Axios.put(`${API_URL}/users/${dataUser.id}`, suspendUser);
            Swal.fire("Unsuspend", "", "success");
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
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
