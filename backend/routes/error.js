const express = require("express");
const error = require("../controllers/error");

const router = express.Router();

// user
router.route("*").get(error.error);
module.exports = router;
