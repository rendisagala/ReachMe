import React, { useEffect, useState } from "react";
import "./PeopleList.css";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getAllUser } from "../../Actions/User";
import { ErrorNotification, SuccessNotification } from "../../Utils/Utils";
import { toast } from "react-toastify";

export default function PeopleList() {
  const { users } = useSelector((state) => state.allUser);
  const { user } = useSelector((state) => state.user);
  const { user: followMessage } = useSelector((state) => state.followUser);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch, followMessage]);

  useEffect(() => {
    if (followMessage) {
      toast.success(followMessage, SuccessNotification);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, followMessage]);

  return (
    <>
      <nav className="sidebar col-2 w-25">
        <div className="pt-5">
          <h5>Check Who is here</h5>{" "}
          {users
            ?.slice(0)
            .reverse()
            .map((data, index) => {
              if (data._id.toString() !== user._id.toString())
                return (
                  <div
                    className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom mb-2 row-cols-3"
                    key={index}
                  >
                    <div className="d-flex flex-row align-items-center feed-text px-2">
                      <img
                        className="rounded-circle"
                        src={data.img}
                        width="45"
                      />
                      <div className="d-flex flex-column flex-wrap ml-2">
                        <span className="font-weight-bold  p-1">
                          {data.name}
                        </span>
                        <span className="text-black-50  time p-1">
                          {data.followers.length} Followers
                        </span>
                      </div>
                    </div>
                    <div className="float-start">
                      {data.followers.includes(user._id) ? (
                        <button
                          type="button"
                          className="btn btn-dark btn-outline-primary text-light"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(followUser(data._id));
                          }}
                        >
                          Followed
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn  btn-primary btn-outline-dark text-light"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(followUser(data._id));
                          }}
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                );
            })}
        </div>
      </nav>
    </>
  );
}
