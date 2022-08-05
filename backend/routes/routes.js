const express = require("express");
const post = require("../controllers/post");
const user = require("../controllers/user");

const router = express.Router();

// post
router.route("/post").post(post.createPost);

// user
router.route("/user").post(user.register);

module.exports = router;
