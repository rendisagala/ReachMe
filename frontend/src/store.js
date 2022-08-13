import { configureStore } from "@reduxjs/toolkit";
import { allPostReducer } from "./Reducers/Post";
import { allUserReducer, userReducer } from "./Reducers/User";

const initialState = {};

const store = configureStore({
  reducer: {
    user: userReducer,
    allPost: allPostReducer,
    allUser: allUserReducer,
  },
});

export default store;
