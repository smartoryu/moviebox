const INITIAL_STATE = {
  id: 0,
  username: "",
  password: "",
  dummy: "",
  role: "",
  login: false,
  error: false,
  wrongUser: false,
  wrongPass: false,
  errorUser: "",
  errorPass: "",
  errorText: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...action.payload,
        login: true,
        wrongUser: false,
        wrongPass: false,
        errorText: ""
      };
    case "LOGIN_RESET":
      return INITIAL_STATE;
    case "WRONG_USER":
      return {
        ...state,
        wrongUser: true,
        errorUser: action.payload
      };
    case "WRONG_PASS":
      return {
        ...state,
        wrongUser: true,
        wrongPass: true,
        errorPass: action.payload
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        error: true,
        errorText: action.payload
      };
    case "LOGOUT_SUCCESS":
      return INITIAL_STATE;
    case "SUSPENDED":
      return { ...state, wrongUser: true, errorUser: action.payload };
    default:
      return state;
  }
};
