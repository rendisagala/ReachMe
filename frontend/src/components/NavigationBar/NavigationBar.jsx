import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

export default function NavigationBar() {
  const [tab, setTab] = useState(window.location.pathname);
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
            {tab === "/profile" ? (
              <div className="navigation-link">
                <i
                  className="fa fa-user-circle"
                  style={{ color: "blue", transform: "scale(1.5)" }}
                ></i>
              </div>
            ) : (
              <div className="navigation-link">
                <i className="fa fa-user-circle"></i>
              </div>
            )}
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
