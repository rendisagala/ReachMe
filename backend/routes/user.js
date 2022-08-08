const express = require("express");
const user = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = express.Router();

// user
router.route("/register").post(user.register);
router.route("/login").post(user.login);
router.route("/logout").delete(auth.isAuth, user.logout);
router.route("/delete").delete(auth.isAuth, user.deleteUser);
router.route("/user").get(auth.isAuth, user.user);
router.route("/user/all").get(auth.isAuth, user.allUser);
router.route("/follow/:id").put(auth.isAuth, user.followAndUnfollow);
router.route("/update/password").put(auth.isAuth, user.updatePassword);
router.route("/update/user").put(auth.isAuth, user.updateUser);

module.exports = router;
