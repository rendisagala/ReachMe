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
