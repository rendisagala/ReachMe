const express = require("express");
const post = require("../controllers/post");
const user = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = express.Router();

// user
router.route("/user/register").post(user.register);
router.route("/user/login").post(user.login);

module.exports = router;
