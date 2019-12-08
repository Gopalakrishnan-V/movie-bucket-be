const express = require("express");
const authRouter = require("./auth");
const profileRouter = require("./profile");
const favoriteRouter = require("./favorite");

const router = express.Router();

router.use(authRouter);
router.use(profileRouter);
router.use("/favorites", favoriteRouter);

module.exports = router;
