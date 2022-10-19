const express = require("express");

const authAPI = require("../components/auth/authApi.js");
const userController = require("../components/users/userController.js");
const widgetAPI = require("../components/widgets/widgetApi.js");
const widgetController = require("../components/widgets/widgetController.js");

const auth = require("../middleware/auth.js");

const apis = express.Router();

apis.use("/auth", authAPI);
apis.use("/widget", auth, widgetAPI);
apis.post("/domain", widgetController.findOneByDomain);

module.exports = apis;
