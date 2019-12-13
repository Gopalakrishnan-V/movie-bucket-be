const express = require("express");
const authRouter = require("./auth");
const profileRouter = require("./profile");
const favoriteMovieRouter = require("./favoriteMovie");
const userFeedRouter = require("./userFeed");

const router = express.Router();

router.use(authRouter);
router.use(profileRouter);
router.use("/favorites", favoriteMovieRouter);
router.use("/feeds/user", userFeedRouter);

module.exports = router;
