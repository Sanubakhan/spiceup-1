const path = require("path");

// FORCE dotenv to read the exact file
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const app = require("./src/app");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
