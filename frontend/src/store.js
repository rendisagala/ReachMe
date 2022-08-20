import { configureStore } from "@reduxjs/toolkit";
import {
  allPostReducer,
  likesAndCommentReducer,
  myPostReducer,
} from "./Reducers/Post";
import { allUserReducer, myUserReducer, userReducer } from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    myUser: myUserReducer,
    myPost: myPostReducer,
    allPost: allPostReducer,
    allUser: allUserReducer,
    likesAndComment: likesAndCommentReducer,
  },
});

export default store;
