import axios from "axios";
import { proxy } from "../Utils/Utils";

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({ type: "allPostRequest" });
    const data = await axios.get(`${proxy}/posts`, {
      withCredentials: true,
    });
    dispatch({ type: "allPostSuccess", payload: data.data.posts });
  } catch (error) {
    dispatch({ type: "allPostFailure", payload: error.response.data.message });
  }
};

export const addPost = (caption, img) => async (dispatch) => {
  try {
    dispatch({ type: "addPostRequest" });
    const data = await axios.post(
      `${proxy}/post/upload`,
      { caption, img },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "addPostSuccess", payload: data.data.post });
  } catch (error) {
    dispatch({ type: "addPostFailure", payload: error.response.data.message });
  }
};
