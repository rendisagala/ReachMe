require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const user = require("./routes/user");
const post = require("./routes/post");
const error = require("./routes/error");
// const path = require("path");

const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: true,
  // origin: [
  //   "http://localhost:3000",
  //   "http://127.0.0.1",
  //   "http://104.142.122.231",
  //   "https://reachme.vercel.app",
  //   "http://reachme.vercel.app",
  //   "reachme.vercel.app",
  //   "https://reachme.vercel.app/api/v1",
  // ],
  exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));

app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1", error);
app.use("/", error);
//

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

module.exports = app;
