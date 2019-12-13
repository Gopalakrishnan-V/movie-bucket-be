const express = require("express");
const userFeedController = require("../controllers/userFeed");

const userFeedRouter = express.Router();

userFeedRouter.get("/", userFeedController.list);

module.exports = userFeedRouter;
