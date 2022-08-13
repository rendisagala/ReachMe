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
    dispatch({ type: "LoginSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "LoginFailure", payload: error.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    const data = await axios
      .get(`${Utils.proxy}/user`, { withCredentials: true })
      .catch((e) => console.log(e));
    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "LoadUserFailure", payload: error.message });
  }
};
