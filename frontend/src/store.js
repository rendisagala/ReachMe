import { configureStore } from "@reduxjs/toolkit";
import { addPostReducer, allPostReducer } from "./Reducers/Post";
import {
  allUserReducer,
  followUserReducer,
  getUserReducer,
  userReducer,
} from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    allPost: allPostReducer,
    allUser: allUserReducer,
    addPost: addPostReducer,
    getUser: getUserReducer,
    followUser: followUserReducer,
  },
});

export default store;
