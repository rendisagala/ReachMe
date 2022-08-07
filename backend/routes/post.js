const express = require("express");
const post = require("../controllers/post");
const auth = require("../middlewares/auth");

const router = express.Router();

// post
router.route("/post/upload").post(auth.isAuth, post.createPost);
router.route("/post/:id").delete(auth.isAuth, post.deletePost);
router.route("/post/like/:id").put(auth.isAuth, post.likeAndUnlike);
router.route("/posts").get(auth.isAuth, post.getPostOfFollowing);

module.exports = router;
