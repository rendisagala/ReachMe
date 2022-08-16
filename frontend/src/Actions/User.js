import axios from "axios";
import { proxy } from "../Utils/Utils";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });
    const data = await axios.post(
      `${proxy}/login`,
      { email, password },
      { withCredentials: true },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "LoginSuccess", payload: data.data.user });
  } catch (error) {
    dispatch({ type: "LoginFailure", payload: error.response.data.message });
  }
};
export const registerUser =
  (name, email, password, reType, img) => async (dispatch) => {
    try {
      dispatch({ type: "RegisterRequest" });
      const data = await axios
        .post(
          `${proxy}/register`,
          { name, email, password, reType, img },
          { withCredentials: true },
          { headers: { "Content-Type": "application/json" } }
        )
        .catch((e) => console.log(e));
      dispatch({ type: "RegisterSuccess", payload: data.data.user });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    const data = await axios.get(`${proxy}/user`, {
      withCredentials: true,
    });
    dispatch({ type: "LoadUserSuccess", payload: data.data.user });
  } catch (error) {
    dispatch({ type: "LoadUserFailure", payload: error.response.data.message });
  }
};

export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: "allUserRequest" });
    const data = await axios.get(`${proxy}/users`, {
      withCredentials: true,
    });
    dispatch({ type: "allUserSuccess", payload: data.data.users });
  } catch (error) {
    dispatch({ type: "allUserFailure", payload: error.response.data.message });
  }
};
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getUserRequest" });
    const data = await axios.get(`${proxy}/user/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: "getUserSuccess", payload: data.data.user });
  } catch (error) {
    dispatch({ type: "getUserFailure", payload: error.response.data.message });
  }
};
export const followUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "followUserRequest" });
    const data = await axios
      .put(`${proxy}/follow/${id}`, {
        withCredentials: true,
      })
      .catch((e) => console.log(e));

    dispatch({ type: "followUserSuccess", payload: data.data.user });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};
