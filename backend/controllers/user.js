const User = require("../models/User");
const Post = require("../models/Post");

exports.register = [
  async (req, res) => {
    try {
      const { name, email, password, img, reType } = req.body;
      let user = await User.findOne({ email });
      if (!reType || reType !== password)
        return res
          .status(400)
          .json({ success: false, message: "Re-type Password" });
      if (user) {
        return res.status(400).json({
          message: "User already exist",
          success: false,
        });
      }

      user = await User.create({
        name,
        email,
        password,
        img,
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
        return res.status(404).json({
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
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res
        .status(200)
        .cookie("token", token, options)
        .json({
          success: true,
          message: `User logged in (${email})`,
          user,
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

      return res
        .status(200)
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .json({ success: true, message: "User Logged Out" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

exports.userById = [
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User Not Found" });
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
];

exports.myUser = [
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
];

exports.allUser = [
  async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
];

exports.followAndUnfollow = [
  async (req, res) => {
    try {
      const loggedInUser = await User.findById(req.user._id);
      const userToFollow = await User.findById(req.params.id);

      if (!userToFollow)
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });

      if (loggedInUser.following.includes(userToFollow._id)) {
        const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
        loggedInUser.following.splice(indexFollowing, 1);
        const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);
        userToFollow.followers.splice(indexFollowers, 1);
        await loggedInUser.save();
        await userToFollow.save();
        return res
          .status(200)
          .json({ success: true, message: "User unfollowed" });
      } else {
        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);
        await loggedInUser.save();
        await userToFollow.save();
        return res
          .status(200)
          .json({ success: true, message: "User Followed" });
      }
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
        .json({ success: true, message: "Password Updated" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

exports.updateUser = [
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const { name, img, email } = req.body;
      if (name) user.name = name;
      if (img) user.img = img;
      if (email) user.email = email;
      await user.save();
      return res.status(200).json({ success: true, message: "User Updated" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

exports.deleteUser = [
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const posts = user.posts;
      const followers = user.followers;
      const followings = user.following;
      for (let i = 0; i < posts.length; i++) {
        const post = await Post.findById(posts[i]);
        await post.remove;
      }
      for (let i = 0; i < followers.length; i++) {
        const follower = await User.findById(followers[i]);
        const index = follower.following.indexOf(user._id);
        follower.following.splice(index, 1);
        await follower.save();
      }
      for (let i = 0; i < followings.length; i++) {
        const following = await User.findById(followings[i]);
        const index = following.followers.indexOf(user._id);
        following.followers.splice(index, 1);
        await following.save();
      }

      await user.remove();
      res.clearCookie("token");
      return res.status(200).json({ success: true, message: "User Deleted" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
];
