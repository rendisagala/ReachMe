require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  img: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    uniqure: [true, "Email already exist"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [true, "Password must be at least 8 characters"],
    select: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

userSchema.pre("save", async (next) => {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async (password) => {
  console.log(this.name, this.email);
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = () => {
  return jwt.sign({ _id: this._id }, process.env.JWT);
};

module.exports = mongoose.model("User", userSchema);
