import { configureStore } from "@reduxjs/toolkit";
import { allPostReducer } from "./Reducers/Post";
import { userReducer } from "./Reducers/User";

const initialState = {};

const store = configureStore({
  reducer: {
    user: userReducer,
    allPost: allPostReducer,
  },
});

export default store;
