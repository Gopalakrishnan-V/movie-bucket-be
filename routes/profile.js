const express = require("express");

const profileRouter = express.Router();

profileRouter.get("/me", async (req, res) => {
  return res.send({ data: { message: "Your details will be displayed here" } });
});

profileRouter.put("/me", async (req, res) => {
  return res.send({ data: { message: "Details are updated" } });
});

module.exports = profileRouter;
