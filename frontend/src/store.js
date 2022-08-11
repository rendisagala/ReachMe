import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/User";

const initialState = {};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
