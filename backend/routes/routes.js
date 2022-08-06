const express = require("express");
const post = require("../controllers/post");
const user = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = express.Router();

// post
router.route("/post/upload").post(auth.isAuth, post.createPost);
router.route("/post/:id").get(auth.isAuth, post.likeAndUnlike);

// user
router.route("/register").post(user.register);
router.route("/login").post(user.login);

module.exports = router;
