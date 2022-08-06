require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const user = require("./routes/user");
const post = require("./routes/post");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

app.use("/api/v1", post);
app.use("/api/v1", user);

module.exports = app;
