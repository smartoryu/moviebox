// const INITIAL_STATE = {
//   id: 0,
//   username: "",
//   password: "",
//   dummy: "",
//   role: "",
//   login: false,
//   error: false,
//   wrongUser: false,
//   wrongPass: false,
//   errorUser: "",
//   errorPass: "",
//   errorText: ""
// };

const INITIAL_STATE = {
  id: 0,
  name: "",
  username: "",
  password: "",
  email: "",
  roleid: "",
  dummy: "",
  suspend: "",
  verified: "",

  login: false,
  register: false,
  error: false,
  wrongName: false,
  wrongUser: false,
  wrongPass: false,
  wrongEmail: false,
  errorName: "",
  errorUser: "",
  errorPass: "",
  errorEmail: "",
  errorText: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // LOGIN
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload, login: true, wrongUser: false, wrongPass: false, errorText: "" };
    case "LOGIN_RESET":
      return INITIAL_STATE;

    // REGISTER
    case "REG_SUCCESS":
      return { ...state, register: true };

    // ERROR
    case "WRONG_FORM":
      return {
        ...state,
        wrongName: true,
        wrongUser: true,
        wrongPass: true,
        wrongEmail: true,
        errorName: action.payload,
        errorUser: action.payload,
        errorPass: action.payload,
        errorEmail: action.payload
      };
    case "WRONG_USER":
      return {
        ...state,
        wrongName: true,
        wrongUser: true,
        wrongPass: false,
        wrongEmail: true,
        errorName: "",
        errorUser: action.payload,
        errorPass: "",
        errorEmail: ""
      };
    case "WRONG_PASS":
      return {
        ...state,
        wrongName: false,
        wrongUser: false,
        wrongPass: true,
        wrongEmail: false,
        errorName: "",
        errorUser: "",
        errorPass: action.payload,
        errorEmail: ""
      };

    case "LOGIN_ERROR":
      return { ...state, error: true, errorText: action.payload };
    case "LOGOUT_SUCCESS":
      return INITIAL_STATE;
    case "SUSPENDED":
      return { ...state, wrongUser: true, errorUser: action.payload };
    default:
      return state;
  }
};
