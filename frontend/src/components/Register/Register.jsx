import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/User";
import { ErrorNotification, SuccessNotification } from "../../Utils/Utils";
import { toast } from "react-toastify";
import backgroundImage from "../../assets/image/background.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const [reType, setReType] = useState("");
  const [alert, setAlert] = useState("");
  const [imgForm, setImgForm] = useState(false);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImg(Reader.result);
      }
    };
  };

  const dispatch = useDispatch();
  const {
    done: userDone,
    error: userError,
    message: userMessage,
  } = useSelector((state) => state.user);

  useEffect(() => {
    setAlert("");
    if (reType !== password && reType.length !== 0) setAlert("confirmPassword");
    if (password.length < 8 && password.length !== 0)
      setAlert("passwordCharacters");
  }, [password, reType]);

  useEffect(() => {
    if (userError && userError !== "Please login first") {
      toast.error(userError, ErrorNotification);
      dispatch({ type: "clearErrors" });
    }
    if (userDone) {
      toast.success(
        "Success! Please go to login page with your registered account",
        SuccessNotification
      );
      dispatch({ type: "clearDone" });
      setName("");
      setEmail("");
      setPassword("");
      setImg("");
      setReType("");
      setImgForm(false);
    }
  }, [dispatch, userError, userDone]);

  const toggleImgForm = () => (imgForm ? setImgForm(false) : setImgForm(true));

  return (
    <>
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div
            className="d-none d-md-flex col-md-4 col-lg-6 bg-image"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            {" "}
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
                      <div className="no-underline">Reachme</div>
                    </div>
                    <h3 className="login-heading mb-4">
                      Let's Set Up Your Account
                    </h3>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => toggleImgForm()}
                    >
                      Add Image
                    </button>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(
                          registerUser(name, email, password, reType, img)
                        );
                      }}
                    >
                      {imgForm ? (
                        <div className="container py-4">
                          <div className="row">
                            {" "}
                            <li className="list-inline-item">
                              <button
                                className="btn btn-danger btn-sm rounded-0"
                                type="button"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete"
                                onClick={() => setImg("")}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </li>
                            <div className="col-sm-4 mx-auto">
                              {" "}
                              <div className="border rounded-lg text-center ">
                                <img
                                  src={img}
                                  className="img-fluid"
                                  id="preview"
                                />
                              </div>
                              <div className="input-group mb-3">
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="custom-file-input"
                                    id="inputGroupFile"
                                    onChange={onImageChange}
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="inputGroupFile"
                                    aria-describedby="inputGroupFileAddon"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <> </>
                      )}
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
                          <i className="fa fa-times-circle me-1"></i>
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
                          <i className="fa fa-times-circle me-1"></i>
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
                            !img ||
                            password.length < 8
                              ? true
                              : false
                          }
                        >
                          Sign Up
                        </button>

                        {userDone ? (
                          <div
                            className="alert alert-success  text-center"
                            role="alert"
                            data-mdb-color="success"
                          >
                            <i className="fa fa-check-circle me-1"></i>
                            <strong> Success! </strong>Please go back to{" "}
                            <Link to="/" className=" link-primary">
                              login page
                            </Link>{" "}
                            with your registered account.
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="small" href="#">
                              Already have an account?
                              <Link to="/" className=" link-primary">
                                {" "}
                                Sign In{" "}
                              </Link>
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
