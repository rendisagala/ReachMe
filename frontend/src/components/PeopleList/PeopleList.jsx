import React, { useEffect, useState } from "react";
import "./PeopleList.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, getAllUser } from "../../Actions/User";
import Loading from "../Loading/Loading";
import { ErrorNotification, SuccessNotification } from "../../Utils/Utils";
import { toast } from "react-toastify";

export default function PeopleList() {
  const { user } = useSelector((state) => state.user);
  const {
    users,
    message: allUserMessage,
    done: allUserDone,
    error: allUserError,
  } = useSelector((state) => state.allUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch, allUserMessage, allUserDone, allUserError]);

  useEffect(() => {
    if (allUserDone === true) {
      toast.success(allUserMessage, SuccessNotification);
      dispatch({ type: "clearDone" });
    }
    if (allUserError) {
      toast.error(allUserError, ErrorNotification);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, allUserMessage, allUserDone, allUserError]);

  return (
    <>
      <nav className="sidebar col-2 w-auto justify-content-center d-flex mx-auto">
        <div className="pt-5">
          <h5>Check Who is here</h5>{" "}
          {users ? (
            <>
              {users?.map((data, index) => {
                if (data?._id.toString() !== user._id.toString())
                  return (
                    <div
                      className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom mb-2 row-cols-3"
                      key={index}
                    >
                      <div className="d-flex flex-row align-items-center feed-text px-2">
                        <Link to={`/user/${data._id}`}>
                          <img
                            className="rounded-circle people-img"
                            src={data.img}
                            width="45"
                          />
                        </Link>
                        <div className="d-flex flex-column flex-wrap ml-2">
                          {" "}
                          <Link to={`/user/${data._id}`}>
                            <span className="font-weight-bold  ">
                              {data.name}
                            </span>{" "}
                          </Link>
                          <span className="text-black-50  time">
                            {data.followers.length} Followers
                          </span>
                        </div>
                      </div>
                      <div className="float-start">
                        <button
                          type="button"
                          className={
                            data.followers.includes(user._id)
                              ? "btn btn-dark btn-outline-primary text-light"
                              : "btn  btn-primary btn-outline-dark text-light"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(followUser(data._id));
                          }}
                        >
                          {data.followers.includes(user._id) ? (
                            <>Followed</>
                          ) : (
                            <>Follow</>
                          )}
                        </button>
                      </div>
                    </div>
                  );
              })}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </nav>
    </>
  );
}
