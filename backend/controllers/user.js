const User = require("../models/User");

exports.register = [
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(500).json({
          message: "User already exist",
          success: false,
        });
      }

      user = await User.create({
        name,
        email,
        password,
        img: { public_id: "sample_id", url: "sample_url" },
      });
      return res.status(201).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
];

exports.login = [
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(400).json({
          success: false,
          message: `There is no user with email ${email}`,
        });
      }

      const checkToken = req.cookies.token;
      if (checkToken)
        return res
          .status(409)
          .json({ success: false, message: "There is another user logged in" });

      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect Password",
        });
      }

      const token = await user.generateToken();

      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.status(201).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

exports.logout = [
  async (req, res) => {
    try {
      const loggedInUser = await User.findById(req.user._id);
      if (!loggedInUser)
        return res
          .status(405)
          .json({ success: false, message: "There is no user logged in" });

      res.clearCookie("token");
      return res
        .status(200)
        .json({ success: true, message: "User Logged Out" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

exports.followUser = [
  async (req, res) => {
    try {
      const loggedInUser = await User.findById(req.user._id);
      const userToFollow = await User.findById(req.params.id);

      if (!userToFollow)
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();
      return res.status(200).json({ success: true, message: "User Followed" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

exports.updatePassword = [
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("+password");
      const { oldPassword, newPassword, reType } = req.body;
      const isMatch = await user.matchPassword(oldPassword);

      if (!oldPassword || !newPassword)
        return res.status(400).json({
          success: false,
          message: "Please Provide Old Password and New Password",
        });

      if (!isMatch)
        return res.status(400).json({
          success: false,
          message: "Incorrect Old Password",
        });

      if (!reType || reType !== newPassword)
        return res
          .status(400)
          .json({ success: false, message: "Re-type New Password" });

      user.password = newPassword;
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Password Changed" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

exports.updateProfile = [
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

exports.unfollowUser = [
  async (req, res) => {
    const loggedInUser = await User.findById(req.user._id);
    const userToUnfollow = await User.findById(req.params.id);

    if (!userToUnfollow)
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });

    if (
      userToUnfollow.followers.includes(loggedInUser._id) &&
      loggedInUser.following.includes(userToUnfollow._id)
    ) {
      const indexFollowers = userToUnfollow.followers.indexOf(loggedInUser._id);
      userToUnfollow.followers.splice(indexFollowers, 1);
      const indexFollowing = loggedInUser.following.indexOf(userToUnfollow._id);
      loggedInUser.following.splice(indexFollowing, 1);
      loggedInUser.save();
      userToUnfollow.save();
      return res
        .status(200)
        .json({ success: true, message: "User Unfollowed" });
    }

    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];
