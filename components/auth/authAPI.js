const express = require("express");
const authController = require("./authController");
const { check, validationResult } = require("express-validator");

const authAPI = express.Router();

//
authAPI.post("/signin", authController.signin);
authAPI.post("/signup", authController.signup);

module.exports = authAPI;
