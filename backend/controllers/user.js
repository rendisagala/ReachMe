const User = require("../models/User");

exports.register = [
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        res.status(500).json({
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
      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(500).json({
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
        res.status(400).json({
          success: false,
          message: `There is no user with email ${email}`,
        });
      }

      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        res.status(400).json({
          success: false,
          message: "Incorrect Password",
        });
      }

      const token = await user.generateToken();

      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(201).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      res.status(500).json({
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
      res.status(500).json({
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
      userToFollow.follower.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();
      return res.status(200).json({ success: true, message: "User Followed" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];
