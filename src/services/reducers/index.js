import usersReducer from "./usersReducer";
import delayedUsersReducer from "./delayedUsersReducer";
import registerReducer from "./registerReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  users: usersReducer,
  delayedUsers: delayedUsersReducer,
  register: registerReducer
});
