const express = require("express");
const user = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = express.Router();

// user
router.route("/user/register").post(user.register);
router.route("/user/login").post(user.login);
router.route("/user/logout").post(auth.isAuth, user.logout);
router.route("/user/follow").post(auth.isAuth, user.followUser);

module.exports = router;
