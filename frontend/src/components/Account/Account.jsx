import React, { useState, useEffect } from "react";
import "./Account.css";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  getAllPosts,
  addLikes,
  addComment,
  deletePost,
  getMyPosts,
} from "../../Actions/Post";
import {
  ErrorNotification,
  SuccessNotification,
  resizeFile,
  InfoNotification,
} from "../../Utils/Utils";
import { toast } from "react-toastify";
import { loadUser, updatePassword, updateUser } from "../../Actions/User";

function Account() {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [reType, setRetype] = useState();
  const [caption, setCaption] = useState("");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [editedImg, setEditedImg] = useState();
  const [img, setImg] = useState();
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { posts: myPost } = useSelector((state) => state.myPost);
  const { error: postAddedError } = useSelector((state) => state.addPost);
  const { done: postAdded } = useSelector((state) => state.addPost);
  const { done: postLiked } = useSelector((state) => state.addLikes);
  const { done: commentAdded, error: commentError } = useSelector(
    (state) => state.addComment
  );
  const { done: postDeleted } = useSelector((state) => state.deletePost);
  const { done: userUpdated } = useSelector((state) => state.updateUser);
  const { done: passwordUpdated, error: updatePasswordError } = useSelector(
    (state) => state.updatePassword
  );

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getMyPosts());
  }, [
    dispatch,
    postAdded,
    postAddedError,
    postLiked,
    commentAdded,
    commentError,
    postDeleted,
    userUpdated,
    updatePasswordError,
    passwordUpdated,
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
    if (postDeleted) {
      toast.info("Post Deleted", InfoNotification);
      dispatch({ type: "clearDone" });
    }
    if (userUpdated === true) {
      toast.success("User Updated", SuccessNotification);
      dispatch({ type: "clearDone" });
      setName();
      setEmail();
      setEditedImg();
    }
    if (updatePasswordError) {
      toast.error(updatePasswordError, ErrorNotification);
      dispatch({ type: "clearErrors" });
    }
    if (passwordUpdated === true) {
      toast.success("Password Updated", SuccessNotification);
      dispatch({ type: "clearDone" });
      setOldPassword();
      setNewPassword();
      setRetype();
    }
  }, [
    dispatch,
    postAddedError,
    postAdded,
    postLiked,
    commentAdded,
    commentError,
    postDeleted,
    userUpdated,
    updatePasswordError,
    passwordUpdated,
  ]);

  const updatePasswordController = () => {
    setTogglePassword((current) => !current);
    {
      !oldPassword && toast.error("Enter Old Password", ErrorNotification);
    }
    {
      !newPassword && toast.error("Enter New Password", ErrorNotification);
    }
    {
      !reType && toast.error("Confirm New Password", ErrorNotification);
    }
    {
      if (oldPassword && newPassword && reType)
        dispatch(updatePassword(oldPassword, newPassword, reType));
    }
  };

  const onImageChange = async (e) => {
    const file = e.target.files[0];
    const image = await resizeFile(file);
    setEditedImg(image);
  };
  console.log(oldPassword);
  return (
    <>
      <div className=" main pt-5 profile-card">
        <div className="row">
          <div className="col-sm-6 picture">
            <center>
              {toggleEdit ? (
                <>
                  {" "}
                  <img
                    className="circle responsive-img rounded rounded-circle border border-dark"
                    src={!editedImg ? user.img : editedImg}
                  />
                  <label htmlFor="upload" className="btn">
                    <i className="fa fa-image text-black-50"></i>

                    <input
                      type="file"
                      id="upload"
                      style={{ display: "none" }}
                      onChange={onImageChange}
                    />
                  </label>
                </>
              ) : (
                <img
                  className="circle responsive-img rounded rounded-circle  border border-dark"
                  src={user.img}
                />
              )}
            </center>
          </div>
          <div className="col-sm-6 details">
            <center>
              <p className="name">
                {toggleEdit ? (
                  <>
                    {" "}
                    <b>{!name ? user.name : name}</b>
                    <input
                      type="text"
                      name="name"
                      placeholder="edit name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </>
                ) : (
                  <b>{user.name}</b>
                )}
              </p>
            </center>
            <center>
              {toggleEdit ? (
                <>
                  <i>{!email ? user.email : email}</i>
                  <input
                    type="email"
                    name="name"
                    placeholder="edit email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </>
              ) : (
                <i className="time">{user.email}</i>
              )}
            </center>

            <center>
              <p>
                <button
                  className={
                    !togglePassword ? "btn btn-dark" : "btn btn-danger"
                  }
                  onClick={
                    !togglePassword
                      ? () => setTogglePassword((current) => !current)
                      : updatePasswordController
                  }
                >
                  Update Password
                </button>
                {togglePassword && (
                  <button
                    title="Cancel"
                    className="btn"
                    onClick={() => {
                      setOldPassword();
                      setNewPassword();
                      setRetype();
                      setTogglePassword((current) => !current);
                    }}
                  >
                    <i className="fa fa-ban text-black-100 text-danger"></i>
                  </button>
                )}
              </p>
            </center>
            {togglePassword && (
              <>
                {" "}
                <input
                  type="text"
                  name="Old Password"
                  placeholder="Old Password"
                  className="form-control password-change"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="text"
                  name="New Password"
                  placeholder="New Password"
                  className="form-control password-change"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="text"
                  name="Confirm New Password"
                  placeholder="Confirm New Password"
                  className="form-control password-change"
                  onChange={(e) => setRetype(e.target.value)}
                />
              </>
            )}

            {/* <center>
              <p>
                <button className="btn btn-dark">Follow</button>{" "}
              </p>
            </center> */}
          </div>
        </div>

        <table className="table">
          <tbody>
            <tr>
              <td>
                <p>
                  <b>{user.posts.length}</b>
                </p>
                <p>Posts</p>
              </td>
              <td>
                <p>
                  <b>{user.followers.length}</b>
                </p>
                <p>Followers</p>
              </td>
              <td>
                <p>
                  <b>{user.following.length}</b>
                </p>
                <p>Following</p>
              </td>
            </tr>
          </tbody>
        </table>

        {!toggleEdit ? (
          <button
            className="waves-effect waves-light btn btn-dark edit "
            onClick={() => setToggleEdit((current) => !current)}
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              className="waves-effect waves-light btn btn-primary edit "
              onClick={() => {
                setToggleEdit((current) => !current);
                dispatch(updateUser(name, editedImg, email));
              }}
            >
              Done
            </button>{" "}
            <button
              title="Cancel"
              className="btn"
              onClick={() => {
                setToggleEdit((current) => !current);
                setOldPassword();
                setNewPassword();
                setRetype();
              }}
            >
              <i className="fa fa-ban text-black-100 text-danger"></i>
            </button>
          </>
        )}
      </div>
      {/*  */}
      <div className="row d-flex justify-content-center ">
        <form
          className="d-flex flex-row justify-content-between align-items-center p-2 bg-white border card border border-dark col-8"
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
        {myPost ? (
          <>
            {myPost
              ?.slice(0)
              .reverse()
              .map((data, index) => {
                return (
                  <div
                    className="bg-white border mt-2 card border-dark px-lg-5 col-8"
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
          <Loading />
        )}
      </div>
    </>
  );
}

export default Account;
