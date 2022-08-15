const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: String,
    img: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    edited: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Post", postSchema);
