import usersReducer from "./usersReducer";
import delayedUsersReducer from "./delayedUsersReducer";
import loginReducer from "./loginReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  users: usersReducer,
  delayedUsers: delayedUsersReducer,
  login: loginReducer
});
