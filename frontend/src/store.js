import { configureStore } from "@reduxjs/toolkit";
import {
  allPostReducer,
  likedPostReducer,
  likesAndCommentReducer,
  myPostReducer,
  userPostReducer,
} from "./Reducers/Post";
import {
  allUserReducer,
  myUserReducer,
  userProfileReducer,
  userReducer,
} from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    myUser: myUserReducer,
    myPost: myPostReducer,
    likesAndComment: likesAndCommentReducer,
    allPost: allPostReducer,
    likedPost: likedPostReducer,
    allUser: allUserReducer,
    userProfile: userProfileReducer,
    userPost: userPostReducer,
  },
});

export default store;
