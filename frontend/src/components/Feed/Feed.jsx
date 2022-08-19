import React, { useEffect, useState } from "react";
import PeopleList from "../PeopleList/PeopleList";
import Loading from "../Loading/Loading";
import "./Feed.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getAllPosts, addLikes, addComment } from "../../Actions/Post";
import {
  ErrorNotification,
  SuccessNotification,
  resizeFile,
} from "../../Utils/Utils";
import { toast } from "react-toastify";

function Feed() {
  const [selected, setSelected] = useState("");
  const [caption, setCaption] = useState("");
  const [img, setImg] = useState();
  const [toggleComment, setToggleComment] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.user);
  const { posts: allPost } = useSelector((state) => state.allPost);
  const { error: postAddedError } = useSelector((state) => state.addPost);
  const { done: postAdded } = useSelector((state) => state.addPost);
  const { done: postLiked } = useSelector((state) => state.addLikes);
  const { done: commentAdded, error: commentError } = useSelector(
    (state) => state.addComment
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [
    dispatch,
    postAdded,
    postAddedError,
    postLiked,
    commentAdded,
    commentError,
  ]);

  useEffect(() => {
    if (postAddedError) {
      toast.error(postAddedError, ErrorNotification);
      dispatch({ type: "clearErrors" });
    }
    if (postAdded === true) {
      toast.success("Post Uploaded", SuccessNotification);
      dispatch({ type: "clearDone" });
      setCaption("");
      setImg();
    }
    if (postLiked === true) {
      toast.success(postLiked, SuccessNotification);
      dispatch({ type: "clearDone" });
    }
    if (commentAdded === true) {
      toast.success("Comment Posted", SuccessNotification);
      dispatch({ type: "clearDone" });
    }
    if (commentError) {
      toast.error(commentError, ErrorNotification);
      dispatch({ type: "clearErrors" });
    }
  }, [
    dispatch,
    postAddedError,
    postAdded,
    postLiked,
    commentAdded,
    commentError,
  ]);

  const onImageChange = async (e) => {
    const file = e.target.files[0];
    const image = await resizeFile(file);
    setImg(image);
  };

  return (
    <>
      <div className="row d-flex ">
        <div className="container d-md-flex align-items-stretch p-5 col-12">
          <div className="container mt-4 mb-5">
            <div className="d-flex justify-content-center row col-12">
              <div className="col-md-12">
                <div className="feed p-2">
                  <form
                    className="d-flex flex-row justify-content-between align-items-center p-2 bg-white border"
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(addPost(caption, img));
                    }}
                  >
                    {" "}
                    <input
                      type="text"
                      name="post"
                      placeholder="How you doing today?"
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-100 border-0 "
                    />{" "}
                    <label htmlFor="upload" className="btn">
                      <i className="fa fa-image text-black-50"></i>

                      <input
                        type="file"
                        id="upload"
                        style={{ display: "none" }}
                        onChange={onImageChange}
                      />
                    </label>
                    <button className="feed-icon px-2  bg-transparent  btn btn-light">
                      <i className="fa fa-long-arrow-up text-black-50"></i>
                    </button>{" "}
                  </form>
                  <div className="feed-image px-3">
                    {img && (
                      <button
                        className="btn btn-danger btn-sm rounded-0"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete"
                        onClick={() => setImg("")}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    )}
                    <img className="img-fluid img-responsive" src={img} />
                  </div>
                  {allPost ? (
                    <>
                      {allPost
                        ?.slice(0)
                        .reverse()
                        .map((data, index) => {
                          return (
                            <div className="bg-white border mt-2" key={index}>
                              <div>
                                <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
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
                                        {data.createdAt
                                          .toString()
                                          .split("T")
                                          .shift()}{" "}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="feed-icon px-2">
                                    <i className="fa fa-ellipsis-v text-black-50"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="feed-image p-2 px-3">
                                {" "}
                                <div className="p-2">
                                  <span>{data.caption}</span>
                                </div>
                                <img
                                  className="img-fluid img-responsive "
                                  src={data.img}
                                />
                              </div>
                              <div className="d-flex justify-content-end socials p-2 py-3 ">
                                <div className="p-2">
                                  <button
                                    className="btn p-0 m-0  btn-link "
                                    onClick={async (e) => {
                                      e.preventDefault();
                                      dispatch(addLikes(data._id));
                                    }}
                                  >
                                    <i
                                      className={
                                        data.likes.some(
                                          (like) => like._id === user._id
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
                                      setToggleComment((current) => !current);
                                      setSelected(data._id);
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
                              <div
                                className={
                                  toggleComment && selected === data._id
                                    ? "comment-section"
                                    : "comment-section visually-hidden"
                                }
                              >
                                <form
                                  className="d-flex flex-row justify-content-between align-items-cente border"
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    dispatch(addComment(data._id, comment));
                                  }}
                                >
                                  {" "}
                                  <input
                                    type="text"
                                    name="comment"
                                    placeholder="Add Comment"
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-100 border-0 rounded"
                                  />{" "}
                                  <button className="feed-icon px-2  bg-transparent  btn btn-light">
                                    <i className="fa fa-long-arrow-up text-black-50"></i>
                                  </button>{" "}
                                </form>
                                {data.comments.map((res, index) => {
                                  return (
                                    <div
                                      className="d-flex flex-row align-items-center feed-text px-2 row"
                                      key={index}
                                    >
                                      <div className="col-2">
                                        <Link to={`/user/${res.user._id}`}>
                                          <img
                                            className="rounded-circle feed-profile"
                                            src={res.user.img}
                                            width="15"
                                          />
                                        </Link>
                                        <div className="d-flex flex-column flex-wrap ml-2">
                                          <Link to={`/user/${res.user._id}`}>
                                            <p className=" font-weight-light px-1 comment-name">
                                              {res.user.name}
                                            </p>{" "}
                                          </Link>
                                        </div>
                                      </div>
                                      <div className="col-10">
                                        <div className="p-2">
                                          <span>{res.comment}</span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              {/*  */}
                            </div>
                          );
                        })}
                    </>
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>
          </div>
          <PeopleList />
        </div>
      </div>
    </>
  );
}

export default Feed;
