import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import Loading from "../Loading/Loading";
import { Link, useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addLikes,
  addComment,
  deletePost,
  getUserPosts,
} from "../../Actions/Post";
import {
  ErrorNotification,
  SuccessNotification,
  InfoNotification,
} from "../../Utils/Utils";
import { toast } from "react-toastify";
import { loadUser, getUserProfile, followUser } from "../../Actions/User";

export default function UserProfile() {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const params = useParams();

  const { user } = useSelector((state) => state.userProfile);
  const { user: loggedInUser } = useSelector((state) => state.user);
  const {
    message: allUserMessage,
    error: allUserError,
    done: allUserDone,
  } = useSelector((state) => state.allUser);

  const { posts } = useSelector((state) => state.userPost);
  const {
    message: likesCommentMessage,
    error: likesCommentError,
    done: likesCommentDone,
  } = useSelector((state) => state.likesAndComment);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getUserProfile(params.id));
    dispatch(getUserPosts(params.id));
  }, [
    dispatch,
    likesCommentError,
    likesCommentDone,
    allUserError,
    allUserDone,
    allUserMessage,
  ]);

  useEffect(() => {
    if (likesCommentError) {
      toast.error(likesCommentError, ErrorNotification);
      dispatch({ type: "clearErrors" });
    }
    if (likesCommentDone === true) {
      likesCommentMessage !== "Post Liked" &&
        likesCommentMessage !== "Post Unliked" &&
        toast.success(likesCommentMessage, SuccessNotification);
      dispatch({ type: "clearDone" });
    }

    if (allUserDone === true) {
      toast.success(allUserMessage, SuccessNotification);
      dispatch({ type: "clearDone" });
    }
    if (allUserError) {
      toast.error(allUserError, ErrorNotification);
      dispatch({ type: "clearErrors" });
    }
  }, [
    dispatch,
    likesCommentError,
    likesCommentDone,
    allUserError,
    allUserDone,
    allUserMessage,
  ]);

  if (params.id === loggedInUser._id) return <Navigate to="/profile" />;

  return (
    <>
      {" "}
      <div className=" main pt-5 profile-card mt-3">
        <div className="row">
          <div className="col-sm-6 picture">
            <center>
              <img
                className="circle responsive-img rounded rounded-circle  border border-dark"
                src={user?.img}
              />
            </center>
          </div>
          <div className="col-sm-6 details">
            <center>
              <p className="name">
                <b>{user?.name}</b>
              </p>
            </center>
            <center>
              <i className="time">{user?.email}</i>
            </center>

            <center>
              <p>
                <button
                  type="button"
                  className={
                    user?.followers.includes(loggedInUser._id)
                      ? "btn btn-dark btn-outline-primary text-light"
                      : "btn  btn-primary btn-outline-dark text-light"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(followUser(params.id));
                  }}
                >
                  {user?.followers.includes(loggedInUser._id) ? (
                    <>Followed</>
                  ) : (
                    <>Follow</>
                  )}
                </button>{" "}
              </p>
            </center>
          </div>
        </div>

        <table className="table">
          <tbody>
            <tr>
              <td>
                <p>
                  <b>{user?.posts.length}</b>
                </p>
                <p>Posts</p>
              </td>
              <td>
                <p>
                  <b>{user?.followers.length}</b>
                </p>
                <p>Followers</p>
              </td>
              <td>
                <p>
                  <b>{user?.following.length}</b>
                </p>
                <p>Following</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/*  */}
      <div className="row d-flex justify-content-center ">
        {posts?.length > 0 ? (
          <>
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
                            {data.author._id === loggedInUser?._id && (
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
                              data.likes.some(
                                (like) => like._id === loggedInUser?._id
                              )
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
                                  src={res.user?.img}
                                  alt="avatar"
                                  width="25"
                                  height="25"
                                  className="rounded rounded-circle"
                                />
                                <p className="small mb-0 ms-2">
                                  {res.user?.name}
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
            <h1 className="lead p-5 col-10 display-3">
              This User Haven't Posted Anything Yet.
            </h1>

            <Loading />
          </>
        )}
      </div>
    </>
  );
}
