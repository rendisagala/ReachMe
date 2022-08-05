require("dotenv").config();
const mongoose = require("mongoose");

exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((response) =>
      console.log(`Database is Connected : ${response.connection.host}`)
    )
    .catch((error) => console.log(error));
};
