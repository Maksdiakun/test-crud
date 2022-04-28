import { combineReducers } from "@reduxjs/toolkit";
import { authReducer, tasksReducer } from "../slices";

export const rootReducer = combineReducers({
  authStore: authReducer,
  tasksStore: tasksReducer,
});
