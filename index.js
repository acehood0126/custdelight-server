require("dotenv").config();
const path = require("path");

const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db.config.js");

const routes = require("./routes/routes.js");

// Connect Database
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "build")));
routes(app);

// app.use("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.use("/api/auth/signup", require("./routes/api/users"));
// app.use("/api/auth/signin", require("./routes/api/auth"));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
