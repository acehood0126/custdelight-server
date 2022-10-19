const express = require("express");
const cors = require("cors");
const apis = require("./apis.js");

const routes = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.use("/api", apis);
};

module.exports = routes;
