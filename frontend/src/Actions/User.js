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
      dispatch({ type: "loginFailure", payload: error });
    }
  };
};
