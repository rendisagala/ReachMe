import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, loadUser, getSearchUser } from "../../Actions/User";
import { ErrorNotification, SuccessNotification } from "../../Utils/Utils";
import { toast } from "react-toastify";

export default function NavigationBar() {
  const [tab, setTab] = useState(window.location.pathname);
  const { user, error } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const { users } = useSelector((state) => state.userProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    name && dispatch(getSearchUser(name));
  }, [dispatch, name]);

  return (
    <>
      <div className="navigation">
        <div className="logo">
          <Link to="/">
            <div className="no-underline">Reachme</div>
          </Link>
        </div>
        <div className="navigation-search-container navbar-form  dropdown">
          <i className="fa fa-search"></i>
          <input
            className="search-field"
            type="text"
            placeholder="Search"
            onChange={(e) => setName(e.target.value)}
          />
          <div className={name ? "dropdown-content" : "d-none"}>
            {name &&
              users?.map((data, index) => (
                <div className="search-result border border-1" key={index}>
                  <Link to={`/user/${data._id}`}>
                    <div className="col-12 mt-2">
                      {" "}
                      <img
                        src={data.img}
                        className="rounded-circle user-profile m-2"
                        height="25"
                        alt={data.name}
                        title={data.name}
                        style={{ outline: " #000 solid 1px   " }}
                      />
                      {data.name}
                    </div>
                  </Link>{" "}
                </div>
              ))}
          </div>
        </div>
        <div className="navigation-icons">
          <Link to="/explore" onClick={() => setTab("/explore")}>
            <div className="navigation-link">
              <i
                className="fa fa-paper-plane"
                style={
                  tab === "/explore" || tab === "/"
                    ? {
                        color: "blue",
                        transform: "scale(1.5)",
                      }
                    : {}
                }
              ></i>
            </div>
          </Link>
          <Link to="/liked" onClick={() => setTab("/liked")}>
            <div className="navigation-link notification">
              <i
                className="fa fa-heart"
                style={
                  tab === "/liked"
                    ? {
                        color: "blue",
                        transform: "scale(1.5)",
                      }
                    : {}
                }
              ></i>
            </div>
          </Link>
          <Link to="/profile" onClick={() => setTab("/profile")}>
            <div className="navigation-link">
              {" "}
              <div
                className=" d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                {user && (
                  <img
                    src={user.img}
                    className="rounded-circle user-profile"
                    height="25"
                    alt={user.name}
                    title={user.name}
                    style={
                      tab === "/profile"
                        ? { outline: " blue solid 2px   " }
                        : { outline: " #000 solid 1px   " }
                    }
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </Link>

          <div
            className="navigation-link  notification logout"
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(logoutUser());
              await toast.success(
                "Logged Out Successfully",
                SuccessNotification
              );
              dispatch(loadUser());
            }}
          >
            <i className="fa fa-sign-out"> </i>
          </div>
        </div>
      </div>
    </>
  );
}
