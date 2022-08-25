import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { ErrorNotification, SuccessNotification } from "../../Utils/Utils";
import { toast } from "react-toastify";
import backgroundImage from "../../assets/image/background.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { error: userError } = useSelector((state) => state.user);

  useEffect(() => {
    if (userError && userError !== "Please login first") {
      toast.error(userError, ErrorNotification);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, userError]);

  return (
    <>
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div
            className="d-none d-md-flex col-md-4 col-lg-6 bg-image"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="bg-text mx-auto my-auto ">
              <div className="logo text-lg-center">
                <div className="no-underline text-white">Reachme</div>
              </div>
              <span className="text-white lead  fw-semibold">
                Connect to People.
              </span>
            </div>
          </div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <div className="logo text-lg-center">
                      <Link to="/">
                        <div className="no-underline">Reachme</div>
                      </Link>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        password.length < 8
                          ? toast.error(
                              "Password Must Be At Least 8 Characters",
                              ErrorNotification
                            )
                          : dispatch(loginUser(email, password));
                      }}
                    >
                      <div className="form-floating mb-3">
                        <input
                          value={email}
                          type="email"
                          className="form-control"
                          id="floatingInput"
                          required
                          autoComplete="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email address</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          value={password}
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                        />
                        <label>Password</label>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberPasswordCheck"
                          value=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberPasswordCheck"
                        >
                          Remember password
                        </label>
                      </div>

                      <div className="d-grid">
                        <button
                          className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                          type="submit"
                          disabled={!email || !password ? true : false}
                        >
                          Sign in
                        </button>

                        <div className="text-center">
                          <div className="small" href="#">
                            Doesn't have an account?{" "}
                            <Link to="/register" className=" link-primary">
                              {" "}
                              Sign Up{" "}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
