const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = [
  async (req, res) => {
    try {
      const newPostData = {
        caption: req.body.caption,
        image: {
          public_id: "req.body.public_id",
          url: "req.body.url",
        },
        author: req.user._id,
      };
      const post = await Post.create(newPostData);
      const user = await User.findById(req.user._id);

      user.posts.push(post._id);
      await user.save();

      res.status(201).json({
        post: post,
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
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
      const post = await Post.findById(req.params.id);
      if (!post)
        return res
          .status(404)
          .json({ success: false, message: "Post Not Found" });

      if (post.author.toString() !== req.user._id.toString())
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });

      await post.remove();

      res.status(200).json({ success: true, message: "Post Deleted" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
];
