const express = require("express");
const { authenticate } = require("../middlewares/tokenAuthenticator");
const profileController = require("../controllers/profile");

const profileRouter = express.Router();

profileRouter.get("/me", authenticate, profileController.showMe);

profileRouter.put("/me", async (req, res) => {
  return res.send({ message: "Details are updated" });
});

module.exports = profileRouter;
