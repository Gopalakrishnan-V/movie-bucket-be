const express = require("express");

const favoriteRouter = express.Router();

favoriteRouter.get("/", async (req, res) => {
  return res.send({ data: { message: "Your details will be displayed here" } });
});

favoriteRouter.get("/check", async (req, res) => {
  return res.send({ data: { isFavorite: false } });
});

favoriteRouter.post("/", async (req, res) => {
  return res.send({ data: { message: "Movie or Series is added" } });
});

favoriteRouter.delete("/:favoriteId", async (req, res) => {
  return res.send({ data: { message: "Details are updated" } });
});

module.exports = favoriteRouter;
