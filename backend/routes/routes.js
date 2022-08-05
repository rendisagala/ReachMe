const express = require("express");
const post = require("../controllers/post");

const router = express.Router();

router.route("/post").post(post.createPost);

module.exports = router;
