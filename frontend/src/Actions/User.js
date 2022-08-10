import axios from "axios";
import Utils from "../Utils/Utils";

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LoginRequest" });
      const data = await axios.post(
        `${Utils.proxy}/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      dispatch({ type: "LoginSuccess", payload: data.user });
    } catch (error) {
      dispatch({ type: "LoginFailure", payload: error });
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LoadUserRequest" });

      dispatch();
      const data = await axios.get(`${Utils.proxy}/user`);
      dispatch({ type: "LoadUserSuccess", payload: data.user });
    } catch (error) {
      dispatch({ type: "LoadUserFailure", payload: error });
    }
  };
};
