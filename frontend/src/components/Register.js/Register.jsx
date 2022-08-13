import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/User";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reType, setReType] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setAlert("");
    if (reType !== password && reType.length !== 0) setAlert("confirmPassword");
    if (password.length < 8 && password.length !== 0)
      setAlert("passwordCharacters");
  }, [password, reType]);

  const registerController = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, reType));
  };

  const { isRegistered } = useSelector((state) => state.user);
  return (
    <>
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <div class="logo text-lg-center">
                      <a href="/">
                        <div class="no-underline">Reachme</div>
                      </a>
                    </div>
                    <h3 className="login-heading mb-4">
                      Let's Set Up Your Account
                    </h3>

                    <form onSubmit={registerController}>
                      <div className="form-floating mb-3">
                        <input
                          value={name}
                          type="text"
                          className="form-control"
                          id="floatingInput name"
                          required
                          autoComplete="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label>Full Name</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          value={email}
                          type="email"
                          className="form-control"
                          id="floatingInput email"
                          required
                          autoComplete="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email address</label>
                      </div>
                      {alert === "passwordCharacters" && (
                        <div className="alert alert-danger alert-dismissible fade show">
                          <i class="fa fa-times-circle me-1"></i>
                          <strong>Error!</strong> Password must be at least 8
                          Characters
                        </div>
                      )}
                      <div className="form-floating mb-3">
                        <input
                          value={password}
                          type="password"
                          className="form-control"
                          id="floatingPassword pass"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                        />
                        <label>Password</label>
                      </div>
                      {alert === "confirmPassword" && (
                        <div className="alert alert-danger alert-dismissible fade show">
                          <i class="fa fa-times-circle me-1"></i>
                          <strong>Error!</strong> Confirm Your Password
                        </div>
                      )}
                      <div className="form-floating mb-3">
                        <input
                          value={reType}
                          type="password"
                          className="form-control"
                          id="floatingPassword repass"
                          required
                          onChange={(e) => setReType(e.target.value)}
                          autoComplete="current-password"
                        />
                        <label>Confirm Your Password</label>
                      </div>
                      <div className="d-grid">
                        <button
                          className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                          type="submit"
                          disabled={
                            !reType ||
                            reType !== password ||
                            password.length < 8
                              ? true
                              : false
                          }
                        >
                          Sign Up
                        </button>

                        {isRegistered ? (
                          <div
                            class="alert alert-success  text-center"
                            role="alert"
                            data-mdb-color="success"
                          >
                            <i class="fa fa-check-circle me-1"></i>
                            <strong> Success! </strong>Please go back to{" "}
                            <Link to="/">login page</Link> with your registered
                            account.
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="small" href="#">
                              Already have an account?
                              <Link to="/"> Sign In </Link>
                            </div>
                          </div>
                        )}
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
