import axios from "axios";
import Utils from "../Utils/Utils";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });
    const data = await axios.post(
      `${Utils.proxy}/login`,
      { email, password },
      { withCredentials: true },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "LoginSuccess", payload: data.data.user });
  } catch (error) {
    dispatch({ type: "LoginFailure", payload: error.message });
  }
};
export const registerUser =
  (name, email, password, reType) => async (dispatch) => {
    try {
      dispatch({ type: "RegisterRequest" });
      const data = await axios.post(
        `${Utils.proxy}/register`,
        { name, email, password, reType },
        { withCredentials: true }
      );
      dispatch({ type: "RegisterSuccess", payload: data.data.user });
    } catch (error) {
      dispatch({ type: "RegisterFailure", payload: error.message });
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    const data = await axios.get(`${Utils.proxy}/user`, {
      withCredentials: true,
    });
    dispatch({ type: "LoadUserSuccess", payload: data.data.user });
  } catch (error) {
    dispatch({ type: "LoadUserFailure", payload: error.message });
  }
};

export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: "allUserRequest" });
    const data = await axios.get(`${Utils.proxy}/users`, {
      withCredentials: true,
    });
    dispatch({ type: "allUserSuccess", payload: data.data.users });
  } catch (error) {
    dispatch({ type: "allUserFailure", payload: error.message });
  }
};
