import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../Actions/User";

export default function NavigationBar() {
  const [tab, setTab] = useState(window.location.pathname);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className="navigation">
        <div className="logo">
          <Link to="/">
            <div className="no-underline">Reachme</div>
          </Link>
        </div>

        <div className="navigation-search-container">
          <i className="fa fa-search"></i>
          <input className="search-field" type="text" placeholder="Search" />
          <div className="search-container">
            <div className="search-container-box">
              <div className="search-results"></div>
            </div>
          </div>
        </div>
        <div className="navigation-icons">
          <Link to="/explore" onClick={() => setTab("/explore")}>
            {tab === "/explore" || tab === "/" ? (
              <div className="navigation-link">
                <i
                  className="fa fa-paper-plane"
                  style={{ color: "blue", transform: "scale(1.5)" }}
                ></i>
              </div>
            ) : (
              <div className="navigation-link">
                <i className="fa fa-paper-plane"></i>
              </div>
            )}
          </Link>
          <Link to="/liked" onClick={() => setTab("/liked")}>
            {tab === "/liked" ? (
              <div className="navigation-link notification">
                <i
                  className="fa fa-heart"
                  style={{ color: "blue", transform: "scale(1.5)" }}
                >
                  <div className="notification-bubble-wrapper">
                    <div className="notification-bubble">
                      <span className="notifications-count">99</span>
                    </div>
                  </div>
                </i>
              </div>
            ) : (
              <div className="navigation-link notification">
                <i className="fa fa-heart">
                  <div className="notification-bubble-wrapper">
                    <div className="notification-bubble">
                      <span className="notifications-count">99</span>
                    </div>
                  </div>
                </i>
              </div>
            )}
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
                <img
                  src={user.img}
                  className="rounded-circle"
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
              </div>
            </div>
          </Link>
          <Link to="/logout">
            <div id="signout" className="navigation-link">
              <i className="fa fa-sign-out"></i>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
