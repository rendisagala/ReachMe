import React from "react";
import "./PeopleList.css";

export default function PeopleList() {
  return (
    <>
      <nav id="sidebar" className="col-2 w-25">
        <div className="pt-5">
          <h5>Categories</h5>{" "}
          <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
            <div className="d-flex flex-row align-items-center feed-text px-2">
              <img
                className="rounded-circle"
                src="https://i.imgur.com/aoKusnD.jpg"
                width="45"
              />
              <div className="d-flex flex-column flex-wrap ml-2">
                <span className="font-weight-bold">Thomson ben</span>
                <span className="text-black-50 time">40 minutes ago</span>
              </div>
            </div>
            <div className="feed-icon px-2">
              <i className="fa fa-ellipsis-v text-black-50"></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
