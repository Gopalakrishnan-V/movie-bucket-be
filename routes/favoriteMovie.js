const express = require("express");
const { authenticate } = require("../middlewares/tokenAuthenticator");
const {
  validateFavoriteMovieAddition,
  validateFavoriteMovieDeletion,
  validateIsFavoriteMovieCheck
} = require("../middlewares/favoriteMovieValidator");
const favoriteMovieController = require("../controllers/favoriteMovie");

const favoriteMovieRouter = express.Router();

favoriteMovieRouter.post(
  "/movies",
  authenticate,
  validateFavoriteMovieAddition,
  favoriteMovieController.add
);

favoriteMovieRouter.delete(
  "/movies/:id",
  authenticate,
  validateFavoriteMovieDeletion,
  favoriteMovieController.remove
);

favoriteMovieRouter.get(
  "/check/movies",
  authenticate,
  validateIsFavoriteMovieCheck,
  favoriteMovieController.isFavoriteMovie
);

favoriteMovieRouter.get("/movies", authenticate, favoriteMovieController.list);

module.exports = favoriteMovieRouter;
