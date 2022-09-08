import React, { useState, useEffect } from "react";
import "./LikedFeed.css";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLikedPosts,
  addLikes,
  addComment,
  deletePost,
} from "../../Actions/Post";
import {
  ErrorNotification,
  SuccessNotification,
  InfoNotification,
} from "../../Utils/Utils";
import { loadUser } from "../../Actions/User";

import { toast } from "react-toastify";

function LikedFeed() {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const { user } = useSelector((state) => state.user);
  const {
    posts,
    error: likedPostError,
    done: likedPostDone,
  } = useSelector((state) => state.likedPost);
  const {
    message: likesCommentMessage,
    error: likesCommentError,
    done: likesCommentDone,
  } = useSelector((state) => state.likesAndComment);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getLikedPosts());
  }, [dispatch, likesCommentError, likesCommentDone, likesCommentMessage]);

  useEffect(() => {
    if (likesCommentError) {
      toast.error(likesCommentError, ErrorNotification);
      dispatch({ type: "clearErrors" });
    }
    if (
      likesCommentDone === true &&
      likesCommentMessage !== "Post Liked" &&
      likesCommentMessage !== "Post Unliked"
    ) {
      toast.success(likesCommentMessage, SuccessNotification);
      dispatch({ type: "clearDone" });
    }
  }, [dispatch, likesCommentError, likesCommentDone, likesCommentMessage]);

  return (
    <>
      <div className="row d-flex justify-content-center p-5">
        {" "}
        {posts?.length > 0 ? (
          <>
            {" "}
            <h1 className="lead p-5 col-10 display-3 mx-auto">
              Post You have Liked.
            </h1>{" "}
            {posts
              ?.slice(0)
              .reverse()
              .map((data, index) => {
                return (
                  <div
                    className="bg-white border mt-2 card border-dark px-lg-5 col-10"
                    key={index}
                  >
                    <div>
                      <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom border-dark">
                        <div className="d-flex flex-row align-items-center feed-text px-2">
                          <Link to={`/user/${data.author._id}`}>
                            <img
                              className="rounded-circle feed-profile"
                              src={data.author.img}
                              width="45"
                            />
                          </Link>
                          <div className="d-flex flex-column flex-wrap ml-2">
                            <Link to={`/user/${data.author._id}`}>
                              <span className="font-weight-bold px-1 ">
                                {data.author.name}
                              </span>{" "}
                            </Link>

                            <span className="text-black-100 time px-1">
                              {data.createdAt.toString().split("T").shift()}{" "}
                            </span>
                          </div>
                        </div>
                        <div className="feed-icon px-2">
                          <button
                            className="btn"
                            onClick={() => {
                              document
                                .getElementById(`options${data._id}`)
                                .classList.toggle("collapse");
                            }}
                          >
                            <i className="fa fa-ellipsis-v text-black-50"></i>
                          </button>
                          <div
                            className="collapse-options collapse"
                            id={`options${data._id}`}
                          >
                            <button
                              className="btn   btn-danger row time col-12"
                              onClick={() =>
                                toast.info(
                                  `Post Reported : ${data._id}`,
                                  InfoNotification
                                )
                              }
                            >
                              Report
                            </button>
                            {data.author._id === user._id && (
                              <button
                                className="btn   btn-danger row time col-12"
                                onClick={() => dispatch(deletePost(data._id))}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="feed-image p-2">
                      {" "}
                      <div className="p-2">
                        <span>{data.caption}</span>
                      </div>
                      {data.img && (
                        <img
                          className="img-fluid img-responsive "
                          src={data.img}
                          alt={data._id}
                        />
                      )}
                    </div>
                    <div className="d-flex justify-content-end socials p-2 py-3 ">
                      <div className="p-2">
                        <button
                          className="btn p-0 m-0  btn-link "
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(addLikes(data._id));
                          }}
                        >
                          <i
                            className={
                              data.likes.some((like) => like._id === user._id)
                                ? "fa fa-heart p-0 m-0 likes text-danger"
                                : "fa fa-heart p-0 m-0 likes"
                            }
                          ></i>
                        </button>{" "}
                        <span className="text-black-50 commentlike">
                          {data.likes.length}
                        </span>
                      </div>
                      <div className="p-2">
                        <button
                          className="btn p-0 m-0  btn-link"
                          onClick={() => {
                            document
                              .getElementById(`comment${data._id}`)
                              .classList.toggle("visually-hidden");
                          }}
                        >
                          <i className="fa fa-comments-o p-0 m-0 comment"></i>{" "}
                        </button>{" "}
                        <span className="text-black-50 commentlike">
                          {data.comments.length}
                        </span>
                      </div>
                    </div>{" "}
                    {/*  */}{" "}
                    <div className="visually-hidden" id={`comment${data._id}`}>
                      <form
                        className="d-flex flex-row justify-content-between align-items-cente border"
                        onSubmit={(e) => {
                          e.preventDefault();
                          dispatch(addComment(data._id, comment));
                          setComment();
                        }}
                      >
                        <input
                          type="text"
                          name="comment"
                          placeholder="Add Comment"
                          onChange={(e) => setComment(e.target.value)}
                          className="w-100 border-0 rounded comment-input"
                        />{" "}
                        <button className="feed-icon px-2  bg-transparent  btn btn-light">
                          <i className="fa fa-long-arrow-up text-black-50"></i>
                        </button>{" "}
                      </form>
                      {data.comments.map((res, index) => {
                        return (
                          <div className="comment-section border" key={index}>
                            <p>{`"${res.comment}"`}</p>

                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <img
                                  src={res.user.img}
                                  alt="avatar"
                                  width="25"
                                  height="25"
                                  className="rounded rounded-circle"
                                />
                                <p className="small mb-0 ms-2">
                                  {res.user.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </>
        ) : (
          <>
            <h1 className="lead p-5 col-8 display-3">
              You haven't liked any posts yet
            </h1>
            <Loading />
          </>
        )}
      </div>
    </>
  );
}

export default LikedFeed;
