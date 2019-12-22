const INITIAL_STATE = {
  id: 0,
  username: "",
  password: "",
  role: "",
  login: false,
  errorUser: false,
  errorPass: false,
  errorTextUser: "",
  errorTextPass: "",
  errorText: ""
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...action.payload,
        login: true,
        errorUser: false,
        errorPass: false,
        errorText: ""
      }
    case "LOGIN_RESET":
      return INITIAL_STATE
    case "WRONG_USER":
      return {
        ...state,
        errorUser: true,
        errorTextUser: action.payload
      }
    case "WRONG_PASS":
      return {
        ...state,
        errorUser: true,
        errorPass: true,
        errorTextPass: action.payload
      }
    case "LOGIN_ERROR":
      return {
        ...state,
        error: true,
        errorText: action.payload
      }
    case "RESET_PASS":
      return { ...state, ...action.payload }
    case "LOGOUT_SUCCESS":
      return INITIAL_STATE
    default:
      return state
  }
}
