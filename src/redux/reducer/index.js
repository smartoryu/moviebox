import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers";
import RegReducers from "./RegReducers";

export default combineReducers({
  Auth: AuthReducers,
  Reg: RegReducers
});
