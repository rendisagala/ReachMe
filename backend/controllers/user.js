const User = require("../models/User");

exports.register = [
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        return res.status(500).json({
          message: "User already exist",
          succes: false,
        });
      }
      user = await User.create({
        name,
        email,
        password,
        img: { public_id: "sample_id", url: "sample_url" },
      });
      res.status(201).json({ succes: true, user });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        succes: false,
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
          message: "Email already exists",
        });
      }

      const isMatch = await user.matchpassword(password);

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
