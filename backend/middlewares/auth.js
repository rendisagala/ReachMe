require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuth = [
  async (req, res, next) => {
    try {
      const { token } = req.cookies;
      if (!token)
        return res.status(401).json({
          message: "No Token",
          success: false,
        });
      const decoded = await jwt.verify(token, process.env.JWT);

      req.user = await User.findById(decoded._id);

      return next();
    } catch (error) {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
];
