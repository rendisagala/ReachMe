require("dotenv").config();

const app = require("./app");
const { connectDatabase } = require("./config/database");

connectDatabase();

const PORT = 5000;
app.listen(PORT || 5000, () => console.log(`Server is Running....`));
