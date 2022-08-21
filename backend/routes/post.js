const express = require("express");
const post = require("../controllers/post");
const auth = require("../middlewares/auth");

const router = express.Router();

// post
router.route("/post/upload").post(auth.isAuth, post.createPost);
router
  .route("/post/:id")
  .put(auth.isAuth, post.updateCaption)
  .delete(auth.isAuth, post.deletePost);
router.route("/posts/me").get(auth.isAuth, post.getMyPost);
router.route("/posts").get(auth.isAuth, post.getAllPost);
router.route("/posts/liked").get(auth.isAuth, post.getPostOfLiked);
router.route("/post/following").get(auth.isAuth, post.getPostOfFollowing);
router.route("/post/like/:id").put(auth.isAuth, post.likeAndUnlike);
router.route("/post/comment/:id").post(auth.isAuth, post.addComment);

module.exports = router;
