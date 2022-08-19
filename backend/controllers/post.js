const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = [
  async (req, res) => {
    try {
      let todayPost = false;
      const postData = await Post.find();
      postData.forEach((data) => {
        if (
          data.author.toString() === req.user._id.toString() &&
          data.createdAt.toDateString() === new Date().toDateString()
        )
          todayPost = true;
      });
      if (todayPost)
        return res.status(400).json({
          success: false,
          message: "You Can Only Send 1 Post For Each Day",
        });
      const newPostData = {
        caption: req.body.caption,
        img: req.body.img,
        author: req.user._id,
      };
      if (req.body.caption.length < 1)
        return res.status(400).json({
          success: false,
          message: "Caption Can't Be Empty",
        });
      const post = await Post.create(newPostData);
      const user = await User.findById(req.user._id);

      user.posts.push(post._id);
      await user.save();

      return res.status(201).json({
        success: true,
        post,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
  },
];

exports.likeAndUnlike = [
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post)
        return res
          .status(404)
          .json({ success: false, message: "Post Not Found" });

      if (post.likes.includes(req.user._id)) {
        const index = post.likes.indexOf(req.user._id);
        post.likes.splice(index, 1);
        await post.save();
        return res.status(200).json({ success: true, message: "Post Unliked" });
      } else {
        post.likes.push(req.user._id);
        await post.save();
        return res.status(200).json({ success: true, message: "Post Liked" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
];

exports.deletePost = [
  async (req, res) => {
    try {
      const loggedInUser = await User.findById(req.user._id);

      const post = await Post.findById(req.params.id);
      if (!post)
        return res
          .status(404)
          .json({ success: false, message: "Post Not Found" });

      if (post.author.toString() !== req.user._id.toString())
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });

      const index = loggedInUser.posts.indexOf(post._id);
      loggedInUser.posts.splice(index, 1);
      await loggedInUser.save();
      await post.remove();

      return res.status(200).json({ success: true, message: "Post Deleted" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
];

exports.getPostOfFollowing = [
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const posts = await Post.find({
        author: { $in: user.following },
      }).populate("author comments.user");
      return res.status(200).json({ success: true, posts });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
];

exports.updateCaption = [
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const { caption } = req.body;

      if (!post)
        return res
          .status(404)
          .json({ success: true, message: "Post Not Found" });

      if (!caption)
        return res
          .status(400)
          .json({ success: false, message: "Please Provide Caption" });

      if (post.author.toString() !== req.user._id.toString())
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });

      post.caption = caption;
      post.edited = true;
      await post.save();
      return res
        .status(200)
        .json({ success: true, message: "Caption Updated" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
];

exports.addComment = [
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post)
        return res
          .status(404)
          .json({ success: true, message: "Post Not Found" });

      todayComment = false;
      post.comments.forEach((data) => {
        if (
          data.user.toString() === req.user._id.toString() &&
          data.date.toDateString() === new Date().toDateString()
        )
          todayComment = true;
      });
      if (todayComment)
        return res.status(400).json({
          success: false,
          message: "You Can Only Send 1 Comment For Each Post Once A Day",
        });

      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
        date: new Date(),
      });
      await post.save();

      return res.status(200).json({
        success: true,
        message: `Comment Added (${req.body.comment})`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
];

exports.getAllPost = [
  async (req, res) => {
    try {
      const posts = await Post.find().populate("author comments.user");
      res.status(200).json({ success: true, posts });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
];
