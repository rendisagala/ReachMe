import React, { useEffect, useState } from "react";
import PeopleList from "../PeopleList/PeopleList";
import "./Feed.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getAllPosts } from "../../Actions/Post";
import { ErrorNotification, SuccessNotification } from "../../Utils/Utils";
import { toast } from "react-toastify";

function Feed() {
  const [caption, setCaption] = useState("");
  const [img, setImg] = useState();
  const { posts: allPost } = useSelector((state) => state.allPost);
  const { error: postAddedError } = useSelector((state) => state.addPost);
  const { done: postAdded } = useSelector((state) => state.addPost);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, postAdded, postAddedError]);

  useEffect(() => {
    if (postAddedError) {
      toast.error(postAddedError, ErrorNotification);
      dispatch({ type: "clearErrors" });
    }
    if (postAdded === true) {
      toast.success("Post Uploaded", SuccessNotification);
      dispatch({ type: "clearDone" });
    }
  }, [dispatch, postAdded, postAddedError]);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImg(Reader.result);
      }
    };
  };

  return (
    <>
      <div className="row d-flex">
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
                  <div className="feed-image p-2 px-3">
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
                    )}{" "}
                    <img className="img-fluid img-responsive" src={img} />
                  </div>
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
                                    className="rounded-circle"
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
                              className="img-fluid img-responsive"
                              src={data.img}
                            />
                          </div>

                          <div className="row col-12">
                            <div className="d-flex justify-content-start socials  col-lg-5 text-black-50 commentlike">
                              <span className="w-100 px-4">
                                0 Likes || 0 Comment
                              </span>
                            </div>
                            <div className="d-flex justify-content-end socials p-2 py-3 col-lg-7">
                              <i className="fa fa-heart"></i>

                              <i className="fa fa-comments-o"></i>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
