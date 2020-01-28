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
      // var user = await Axios.get(`${API_URL}/auth/login?username=${username}&password=${password}&dummy=${password}`);
      var user = await Axios.get(`${API_URL}/auth/login`, {
        params: { username, password }
      });

      switch (user.data.status) {
        case "RESET_PASS":
          return {};
        case "WRONG_USER":
          return dispatch({ type: "WRONG_USER", payload: user.data.message });
        case "WRONG_PASS":
          return dispatch({ type: "WRONG_PASS", payload: user.data.message });
        case "SUSPENDED":
          return dispatch({ type: "SUSPENDED", payload: user.data.message });
        default:
          localStorage.setItem("userLogin", user.data[0]["id"]);
          return dispatch(LoginSuccessAction(user.data[0]));
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
          await Swal.fire("Suspended", "", "success");
          window.location.reload();
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
            await Swal.fire("Unsuspend", "", "success");
            window.location.reload();
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

export const RegisterThunkAction = (name, username, email, password1, password2) => {
  return async dispatch => {
    // var newUser = { name, username, email, password1, password2 };
    try {
      const newUser = await Axios.post(`${API_URL}/auth/register`, {
        name,
        username,
        email,
        password1,
        password2
      });
      console.log(newUser.data);

      switch (newUser.data.status) {
        case "WRONG_FORM":
          return dispatch({ type: "WRONG_FORM", payload: newUser.data.message });
        case "WRONG_USER":
          return dispatch({ type: "WRONG_USER", payload: newUser.data.message });
        case "WRONG_PASS":
          return dispatch({ type: "WRONG_PASS", payload: newUser.data.message });
        case "REG_SUCCESS":
          return dispatch({ type: "REG_SUCCESS" });
        default:
          break;
      }

      // var user = await Axios.get(`${API_URL}/users?username=${username}`);
      // await dispatch({ type: "REG_RESET" });
      // ///// cek apakah username sudah terdaftar
      // if (user.data.length) {
      //   dispatch({ type: "WRONG_USER", payload: "Username already registered!" });
      // } else {
      //   ///// cek apakah kedua password cocok
      //   if (password1 !== password2) {
      //     dispatch({ type: "WRONG_PASS", payload: "Password doesn't match!" });
      //   } else {
      //     ///// kalo oke semua, gas!
      //     try {
      //       await Axios.post(`${API_URL}/users`, newUser);
      //       dispatch({ type: "REG_SUCCESS" });
      //     } catch (error) {
      //       console.log(error);
      //       dispatch({ type: "REG_ERROR", payload: "Server error!" });
      //     }
      //   }
      // }
    } catch (error) {
      console.log(error);
      dispatch({ type: "REG_ERROR", payload: "Server error!" });
    }
  };
};

/*
      /// cek apakah username terdaftar
      if (user.data[0]) {
        console.log("USER REGISTERED");
        /// cek apakah user di-suspend
        if (user.data[0]["suspend"] === 0) {
          console.log("USER NOT SUSPENDED");

          // GET PASS / DUMMY PASS
          try {
            var pass = await Axios.get(`${API_URL}/auth/login?username=${username}&password=${password}`);
            try {
              var dummy = await Axios.get(`${API_URL}/auth/login?username=${username}&dummy=${password}`);
            } catch (error) {
              console.log("dummy", error);
            }
          } catch (error) {
            console.log("pass", error);
          }
          console.log(pass.data);

          /// cek apakah akun sudah ada passwordnya
          if (pass.data.length) {
            console.log("pass ada");
            // localStorage.setItem("userLogin", pass.data[0].id);
            // localStorage.setItem("userToken", pass.data[0].token);
            // dispatch(LoginSuccessAction(pass.data[0]));
            /// cek apakah akun masih punya password dummy
          } else if (dummy.data.length) {
            console.log("dummy ada");
            // localStorage.setItem("userLogin", dummy.data[0].id);
            // localStorage.setItem("userToken", pass.data[0].token);
            // dispatch(LoginSuccessAction(dummy.data[0]));
            /// password salah
          } else {
            console.log("pass salah");
            // dispatch({
            //   type: "WRONG_PASS",
            //   payload: "Username/Password doesn't match!"
            // });
          }
        } else {
          console.log("USER SUSPENDED");
          dispatch({ type: "SUSPENDED", payload: "Your account was suspended" });
        }
        /// username tidak terdaftar
      } else {
        console.log("USER NOT REGISTERED");
        // dispatch({ type: "WRONG_USER", payload: "Username not registered!" });
      }
      */
