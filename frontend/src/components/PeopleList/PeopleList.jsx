import React, { useEffect, useState } from "react";
import "./PeopleList.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Actions/User";

export default function PeopleList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const { users: user } = useSelector((state) => state.allUser);
  return (
    <>
      <nav id="sidebar" className="col-2 w-25">
        <div className="pt-5">
          <h5>Check Who is here</h5>{" "}
          {user?.map((data, index) => {
            return (
              <div
                className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom mb-2"
                key={index}
              >
                <div className="d-flex flex-row align-items-center feed-text px-2">
                  <img
                    className="rounded-circle"
                    src="https://i.imgur.com/aoKusnD.jpg"
                    width="45"
                  />
                  <div className="d-flex flex-column flex-wrap ml-2">
                    <span className="font-weight-bold  p-1">{data.name}</span>
                    <span className="text-black-50 time">40 minutes ago</span>
                  </div>
                </div>
                <div className="feed-icon px-2">
                  <i className="fa fa-ellipsis-v text-black-50"></i>
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
