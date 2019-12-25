const INITIAL_STATE = {
  register: false,
  error: false,
  errorUser: false,
  errorTextUser: "",
  errorPass: false,
  errorTextPass: "",
  errorText: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REG_SUCCESS":
      return { ...state, register: true };
    case "REG_RESET":
      return state;
    case "REG_ERROR":
      return { ...state, error: true, errorText: action.payload };
    case "WRONG_USER":
      return {
        ...state,
        errorUser: true,
        errorTextUser: action.payload
      };
    case "WRONG_PASS":
      return {
        ...state,
        errorUser: false,
        errorPass: true,
        errorTextPass: action.payload
      };
    default:
      return state;
  }
};
