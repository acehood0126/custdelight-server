const express = require("express");
const widgetController = require("./widgetController.js");

const widgetAPI = express.Router();

widgetAPI.post("/", widgetController.updateWidget);
widgetAPI.get("/", widgetController.readWidget);

module.exports = widgetAPI;
