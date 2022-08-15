import { configureStore } from "@reduxjs/toolkit";
import { addPostReducer, allPostReducer } from "./Reducers/Post";
import { allUserReducer, getUserReducer, userReducer } from "./Reducers/User";

const initialState = {};

const store = configureStore({
  reducer: {
    user: userReducer,
    allPost: allPostReducer,
    allUser: allUserReducer,
    addPost: addPostReducer,
    getUser: getUserReducer,
  },
});

export default store;
