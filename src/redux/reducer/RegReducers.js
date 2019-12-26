const INITIAL_STATE = {
  register: false,
  error: false,
  errorText: "",

  wrongUser: false,
  errorUser: "",
  wrongPass: false,
  errorPass: "",

  wrongOldPass: false,
  errorOldPass: "",
  wrongNewPass: false,
  errorNewPass: ""
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
      return { ...state, wrongUser: true, errorUser: action.payload };
    case "WRONG_PASS":
      return { ...state, wrongUser: false, errorUser: "", wrongPass: true, errorPass: action.payload };
    case "WRONG_OLDPASS":
      return { ...state, wrongOldPass: true, errorOldPass: action.payload };
    case "WRONG_NEWPASS":
      return { ...state, wrongNewPass: true, errorNewPass: action.payload };
    default:
      return state;
  }
};
