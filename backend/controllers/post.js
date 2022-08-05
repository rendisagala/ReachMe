const Post = require("../models/Post");

exports.createPost = [
  async (req, res) => {
    try {
      const newPostData = {
        caption: req.body.caption,
        image: {
          public_id: req.body.public_id,
          url: req.body.url,
        },
        author: req.user_id,
      };

      const newPost = await Post.create(newPostData);
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  },
];
