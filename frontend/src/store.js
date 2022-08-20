import { configureStore } from "@reduxjs/toolkit";
import {
  addCommentReducer,
  addLikesReducer,
  addPostReducer,
  allPostReducer,
  deletePostReducer,
  myPostReducer,
} from "./Reducers/Post";
import {
  allUserReducer,
  followUserReducer,
  getUserReducer,
  updatePasswordReducer,
  updateUserReducer,
  userReducer,
} from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    myPost: myPostReducer,
    allPost: allPostReducer,
    allUser: allUserReducer,
    addPost: addPostReducer,
    getUser: getUserReducer,
    updateUser: updateUserReducer,
    updatePassword: updatePasswordReducer,
    followUser: followUserReducer,
    addLikes: addLikesReducer,
    addComment: addCommentReducer,
    deletePost: deletePostReducer,
  },
});

export default store;
