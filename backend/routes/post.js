const express = require("express");
const post = require("../controllers/post");
const auth = require("../middlewares/auth");

const router = express.Router();

// post
router.route("/post/upload").post(auth.isAuth, post.createPost);
router
  .route("/post/:id")
  .get(auth.isAuth, post.likeAndUnlike)
  .delete(auth.isAuth, post.deletePost);

module.exports = router;
