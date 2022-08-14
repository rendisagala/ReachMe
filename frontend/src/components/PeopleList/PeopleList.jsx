import React, { useEffect, useState } from "react";
import "./PeopleList.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Actions/User";

export default function PeopleList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const { users } = useSelector((state) => state.allUser);
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <nav id="sidebar" className="col-2 w-25">
        <div className="pt-5">
          <h5>Check Who is here</h5>{" "}
          {users?.map((data, index) => {
            if (data._id.toString() !== user._id.toString())
              return (
                <div
                  className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom mb-2 row-cols-6"
                  key={index}
                >
                  <div className="d-flex flex-row align-items-center feed-text px-2">
                    <img className="rounded-circle" src={data.img} width="45" />
                    <div className="d-flex flex-column flex-wrap ml-2">
                      <span className="font-weight-bold  p-1">{data.name}</span>
                      <span className="text-black-50 time p-1">
                        {data.followers.length} Followers
                      </span>
                    </div>
                  </div>
                  <div className="float-start px-2">
                    <button type="button" className="btn btn-outline-dark">
                      Follow
                    </button>
                  </div>
                </div>
              );
          })}
        </div>
      </nav>
    </>
  );
}
