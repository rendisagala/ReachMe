import { configureStore } from "@reduxjs/toolkit";
import {
  addCommentReducer,
  addLikesReducer,
  addPostReducer,
  allPostReducer,
  deletePostReducer,
} from "./Reducers/Post";
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
    addLikes: addLikesReducer,
    addComment: addCommentReducer,
    deletePost: deletePostReducer,
  },
});

export default store;
