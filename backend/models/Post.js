const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({});

module.exports = mongoose.model("Post", postSchema);
