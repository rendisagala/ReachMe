import { configureStore } from "@reduxjs/toolkit";
import {
  allPostReducer,
  likedPostReducer,
  likesAndCommentReducer,
  myPostReducer,
} from "./Reducers/Post";
import { allUserReducer, myUserReducer, userReducer } from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    myUser: myUserReducer,
    myPost: myPostReducer,
    likesAndComment: likesAndCommentReducer,
    allPost: allPostReducer,
    likedPost: likedPostReducer,
    allUser: allUserReducer,
  },
});

export default store;
