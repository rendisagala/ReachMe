const express = require("express");
const user = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = express.Router();

// user
router.route("/user/register").post(user.register);
router.route("/user/login").post(user.login);
router.route("/user/logout").delete(auth.isAuth, user.logout);
router.route("/user/follow/:id").put(auth.isAuth, user.followUser);
router.route("/user/unfollow/:id").delete(auth.isAuth, user.unfollowUser);
router.route("/update/password").put(auth.isAuth, user.updatePassword);
router.route("/update/profile").put(auth.isAuth, user.updateProfile);

module.exports = router;
