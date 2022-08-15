import React, { useEffect, useState } from "react";
import PeopleList from "../PeopleList/PeopleList";
import "./Feed.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getAllPosts } from "../../Actions/Post";

function Feed() {
  const [caption, setCaption] = useState("");
  const [img, setImg] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const { posts } = useSelector((state) => state.allPost);

  const addPostController = (e) => {
    e.preventDefault();
    dispatch(addPost(caption, img));
  };
  const { postAdded } = useSelector((state) => state.user);

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
                  {postAdded && (
                    <div
                      class="alert alert-success alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Success!</strong> Post Uploaded.
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                    </div>
                  )}

                  <form
                    className="d-flex flex-row justify-content-between align-items-center p-2 bg-white border"
                    onSubmit={addPostController}
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
                  {posts?.map((data, index) => {
                    return (
                      <div className="bg-white border mt-2" key={index}>
                        <div>
                          <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                            <div className="d-flex flex-row align-items-center feed-text px-2">
                              <img
                                className="rounded-circle"
                                src={data.author.img}
                                width="45"
                              />
                              <div className="d-flex flex-column flex-wrap ml-2">
                                <span className="font-weight-bold px-1">
                                  {data.author.name}
                                </span>
                                <span className="text-black-50 time">
                                  40 minutes ago
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
                        <div className="d-flex justify-content-end socials p-2 py-3">
                          <i className="fa fa-heart"></i>

                          <i className="fa fa-comments-o"></i>
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
