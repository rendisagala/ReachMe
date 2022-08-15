import axios from "axios";
import Utils from "../Utils/Utils";

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({ type: "allPostRequest" });
    const data = await axios.get(`${Utils.proxy}/posts`, {
      withCredentials: true,
    });
    dispatch({ type: "allPostSuccess", payload: data.data.posts });
  } catch (error) {
    dispatch({ type: "allPostFailure", payload: error.message });
  }
};

export const addPost = (caption, img) => async (dispatch) => {
  try {
    dispatch({ type: "addPostRequest" });
    const data = await axios.post(
      `${Utils.proxy}/post/upload`,
      { caption, img },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "addPostSuccess", payload: data.data.post });
  } catch (error) {
    dispatch({ type: "addPostFailure", payload: error.message });
  }
};
