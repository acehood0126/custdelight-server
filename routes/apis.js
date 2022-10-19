const express = require("express");

const authAPI = require("../components/auth/authApi");
const userController = require("../components/users/userController");
const widgetAPI = require("../components/widgets/widgetApi");
const widgetController = require("../components/widgets/widgetController");

const auth = require("../middleware/auth");

const apis = express.Router();

apis.use("/auth", authAPI);
apis.use("/widget", auth, widgetAPI);
apis.post("/domain", widgetController.findOneByDomain);

module.exports = apis;
