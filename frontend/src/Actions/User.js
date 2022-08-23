import axios from "axios";
import { proxy } from "../Utils/Utils";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });
    const data = await axios
      .post(
        `${proxy}/login`,
        { email, password },
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      )
      .catch((error) =>
        dispatch({ type: "LoginFailure", payload: error.response.data.message })
      );
    dispatch({ type: "LoginSuccess", payload: data.data.message });
  } catch (error) {}
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
        .catch((error) =>
          dispatch({
            type: "RegisterFailure",
            payload: error.response.data.message,
          })
        );
      dispatch({ type: "RegisterSuccess", payload: data.data.message });
    } catch (error) {}
  };

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LogoutUserRequest" });
    const data = await axios
      .delete(`${proxy}/logout`, {
        withCredentials: true,
      })
      .catch((error) =>
        dispatch({
          type: "LogoutUserFailure",
          payload: error.response.data.message,
        })
      );
    dispatch({ type: "LogoutUserSuccess", payload: data.data.message });
  } catch (error) {}
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    const data = await axios
      .get(`${proxy}/user`, {
        withCredentials: true,
      })
      .catch((error) =>
        dispatch({
          type: "LoadUserFailure",
          payload: error.response.data.message,
        })
      );
    dispatch({ type: "LoadUserSuccess", payload: data.data.user });
  } catch (error) {}
};

export const updateUser = (name, img, email) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserRequest" });
    const data = await axios
      .put(
        `${proxy}/update/user`,
        { name, img, email },
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      )
      .catch((error) =>
        dispatch({
          type: "updateUserFailure",
          payload: error.response.data.message,
        })
      );
    dispatch({ type: "updateUserSuccess", payload: data.data.message });
  } catch (error) {}
};

export const updatePassword =
  (oldPassword, newPassword, reType) => async (dispatch) => {
    try {
      dispatch({ type: "updatePasswordRequest" });
      const data = await axios
        .put(
          `${proxy}/update/password`,
          { oldPassword, newPassword, reType },
          { withCredentials: true },
          { headers: { "Content-Type": "application/json" } }
        )
        .catch((error) =>
          dispatch({
            type: "updatePasswordFailure",
            payload: error.response.data.message,
          })
        );
      dispatch({ type: "updatePasswordSuccess", payload: data.data.message });
    } catch (error) {}
  };

export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: "allUserRequest" });
    const data = await axios
      .get(`${proxy}/users`, {
        withCredentials: true,
      })
      .catch((error) =>
        dispatch({
          type: "allUserFailure",
          payload: error.response.data.message,
        })
      );
    dispatch({ type: "allUserSuccess", payload: data.data.users });
  } catch (error) {}
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "myUserRequest" });
    const data = await axios
      .get(`${proxy}/user/${id}`, {
        withCredentials: true,
      })
      .catch((error) =>
        dispatch({
          type: "myUserFailure",
          payload: error.response.data.message,
        })
      );

    dispatch({ type: "myUserSuccess", payload: data.data.user });
  } catch (error) {}
};

export const followUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "followUserRequest" });
    const data = await axios
      .post(
        `${proxy}/follow/${id}`,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      )
      .catch((error) =>
        dispatch({
          type: "followUserFailure",
          payload: error.response.data.message,
        })
      );

    dispatch({ type: "followUserSuccess", payload: data.data.message });
  } catch (error) {}
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userProfileRequest" });
    const data = await axios
      .get(`${proxy}/user/${id}`, {
        withCredentials: true,
      })
      .catch((error) =>
        dispatch({
          type: "userProfileFailure",
          payload: error.response.data.message,
        })
      );
    dispatch({ type: "userProfileSuccess", payload: data.data.user });
  } catch (error) {}
};

export const getSearchUser = (name) => async (dispatch) => {
  try {
    dispatch({ type: "searchUserRequest" });
    const data = await axios
      .get(`${proxy}/users/find?name=${name}`, {
        withCredentials: true,
      })
      .catch((error) =>
        dispatch({
          type: "searchUserFailure",
          payload: error.response.data.message,
        })
      );
    dispatch({ type: "searchUserSuccess", payload: data.data.users });
  } catch (error) {}
};
