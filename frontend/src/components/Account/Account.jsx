import React, { useState, useEffect } from "react";
import "./Account.css";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  addLikes,
  addComment,
  deletePost,
  getMyPosts,
} from "../../Actions/Post";
import {
  ErrorNotification,
  SuccessNotification,
  InfoNotification,
} from "../../Utils/Utils";
import { toast } from "react-toastify";
import {
  loadUser,
  updatePassword,
  updateUser,
  deleteUser,
} from "../../Actions/User";
import { Button, Modal } from "react-bootstrap";

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
  const [toggleDelete, setToggleDelete] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const {
    message: myUserMessage,
    error: myUserError,
    done: myUserDone,
  } = useSelector((state) => state.myUser);

  const {
    posts,
    message: myPostMessage,
    error: myPostError,
    done: myPostDone,
  } = useSelector((state) => state.myPost);
  const {
    message: likesCommentMessage,
    error: likesCommentError,
    done: likesCommentDone,
  } = useSelector((state) => state.likesAndComment);

  const onImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        console.log("hello world");
        // !img || editedImg ? setImg(Reader.result) : setEditedImg(Reader.result);
        toggleEdit ? setEditedImg(Reader.result) : setImg(Reader.result);
      }
    };
  };

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getMyPosts());
  }, [
    dispatch,
    likesCommentError,
    likesCommentDone,
    myPostError,
    myPostDone,
    myUserError,
    myUserDone,
  ]);

  useEffect(() => {
    if (myPostError) {
      toast.error(myPostError, ErrorNotification);
      dispatch({ type: "clearErrors" });
    }
    if (myPostDone === true) {
      toast.success(myPostMessage, SuccessNotification);
      dispatch({ type: "clearDone" });
      setCaption("");
      setImg();
      setName();
      setEmail();
      setEditedImg();
      setOldPassword();
      setNewPassword();
      setRetype();
    }
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
    if (myUserDone === true) {
      toast.success(myUserMessage, SuccessNotification);
      dispatch({ type: "clearDone" });
      setCaption("");
      setImg();
      setName();
      setEmail();
      setEditedImg();
      setOldPassword();
      setNewPassword();
      setRetype();
    }
    if (myUserError) {
      toast.error(myUserError, ErrorNotification);
      dispatch({ type: "clearErrors" });
    }
  }, [
    dispatch,
    likesCommentError,
    likesCommentDone,
    myPostError,
    myPostDone,
    myUserError,
    myUserDone,
  ]);

  return (
    <>
      <div className=" main pt-5 profile-card mt-3">
        <div className="row">
          <div className="col-sm-6 picture">
            <center>
              {toggleEdit ? (
                <>
                  {" "}
                  <img
                    className="circle responsive-img rounded rounded-circle border border-dark"
                    src={!editedImg ? user?.img : editedImg}
                  />
                  <label htmlFor="upload" className="btn">
                    <i className="fa fa-image text-black-50"></i>

                    <input
                      type="file"
                      accept="image/*"
                      id="upload"
                      style={{ display: "none" }}
                      onChange={onImageChange}
                    />
                  </label>{" "}
                </>
              ) : (
                <img
                  className="circle responsive-img rounded rounded-circle  border border-dark"
                  src={user?.img}
                />
              )}
            </center>{" "}
          </div>
          <div className="col-sm-6 details">
            <center>
              <p className="name">
                {toggleEdit ? (
                  <>
                    {" "}
                    <b>{!name ? user?.name : name}</b>
                    <input
                      type="text"
                      name="name"
                      placeholder="edit name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </>
                ) : (
                  <b>{user?.name}</b>
                )}
              </p>
            </center>
            <center>
              {toggleEdit ? (
                <>
                  <i>{!email ? user?.email : email}</i>
                  <input
                    type="email"
                    name="name"
                    placeholder="edit email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </>
              ) : (
                <i className="time">{user?.email}</i>
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
                      : () => {
                          if (oldPassword && newPassword && reType)
                            dispatch(
                              updatePassword(oldPassword, newPassword, reType)
                            );
                          setTogglePassword((current) => !current);
                        }
                  }
                >
                  Update Password
                </button>{" "}
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
              </p>{" "}
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
        {!toggleEdit ? (
          <>
            {" "}
            <button
              className="waves-effect waves-light btn btn-dark edit "
              onClick={() => setToggleEdit((current) => !current)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <button
              className="waves-effect waves-light btn btn-danger edit "
              onClick={() => {
                setToggleEdit((current) => !current);
                (name || editedImg || email) &&
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
            </button>{" "}
            <button
              className="waves-effect waves-light btn btn-dark edit mt-3"
              onClick={() => {
                setToggleDelete((current) => !current);
                // dispatch(deleteUser());
              }}
            >
              Delete Profile
            </button>
          </>
        )}{" "}
      </div>
      <div className="row d-flex justify-content-center ">
        <form
          className={
            toggleEdit
              ? "d-flex flex-row justify-content-between align-items-center p-2 bg-white border card border border-dark col-10 d-none"
              : "d-flex flex-row justify-content-between align-items-center p-2 bg-white border card border border-dark col-10"
          }
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
              accept="image/*"
              style={{ display: "none" }}
              onChange={onImageChange}
            />
          </label>
          <button className="feed-icon px-2  bg-transparent  btn btn-light">
            <i className="fa fa-long-arrow-up text-black-50"></i>
          </button>{" "}
        </form>
        <div className="feed-image px-3 col-10">
          {img && (
            <button
              className="btn btn-danger btn-sm rounded-0"
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="Delete"
              onClick={() => {
                setImg();
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
          )}
          <img className="img-fluid img-responsive" src={img} />
        </div>
        {posts ? (
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
                            {data.author._id === user?._id && (
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
                              data.likes.some((like) => like._id === user?._id)
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
          <Loading />
        )}
      </div>{" "}
      {/* modal */}
      <Modal
        show={toggleDelete}
        onHide={() => {
          setToggleDelete((current) => !current);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead fw-bold">Please Type Your Email To Confirm</p>
        </Modal.Body>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="form-control  w-50 mx-auto"
          onChange={(e) => setConfirmEmail(e.target.value)}
        />{" "}
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              confirmEmail === user?.email
                ? dispatch(deleteUser())
                : toast.error("Incorrect Email", ErrorNotification);
            }}
          >
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Account;
