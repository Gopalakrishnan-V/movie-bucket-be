const _omit = require("lodash/omit");
const FavoriteMovie = require("../models/favoriteMovie");
const { getInternalServerError } = require("../utils/errorUtil");

module.exports.add = async (req, res) => {
  const user_id = req.user.id;
  const {
    movie_id,
    genres,
    original_language,
    original_title,
    poster_path,
    release_date,
    runtime,
    title,
    vote_average
  } = req.body;

  try {
    const existingFavoriteMovie = await FavoriteMovie.findOne({
      movie_id,
      user_id
    });
    if (existingFavoriteMovie) {
      return res
        .status(208)
        .send({ message: "This movie is already added to favorites list" });
    }

    let favoriteMovie = new FavoriteMovie({
      user_id,
      movie_id,
      genres,
      original_language,
      original_title,
      poster_path,
      release_date,
      runtime,
      title,
      vote_average
    });
    favoriteMovie = await favoriteMovie.save();
    return res.send({ data: _omit(favoriteMovie, ["user_id"]) });
  } catch (e) {
    return res.status(500).send(getInternalServerError());
  }
};

module.exports.remove = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;
  try {
    let favoriteMovie = await FavoriteMovie.findOne({ _id: id, user_id });
    if (!favoriteMovie) {
      return res.send({ error: { code: 404, message: "Not found" } });
    }
    favoriteMovie = await favoriteMovie.remove();
    return res.send({
      data: { id },
      message: "movie is removed from favorites list successfully"
    });
  } catch (err) {
    return res.status(500).send(getInternalServerError());
  }
};

module.exports.isFavoriteMovie = async (req, res) => {
  const user_id = req.user.id;
  const movie_id = parseInt(req.query.movie_id);
  try {
    const favoriteMovie = await FavoriteMovie.findOne({ user_id, movie_id });
    const favoriteMovieId = favoriteMovie ? favoriteMovie._id : null;
    return res.send({ data: { id: favoriteMovieId } });
  } catch (err) {
    return res.status(500).send(getInternalServerError());
  }
};

module.exports.list = async (req, res) => {
  const user_id = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const query = { user_id };
    const options = {
      select: "-user_id",
      sort: { added_at: -1 },
      page,
      limit
    };

    const result = await FavoriteMovie.paginate(query, options);
    const resBody = {
      page,
      total_results: result.total,
      total_pages: result.pages,
      results: result.docs
    };
    return res.send(resBody);
  } catch (err) {
    return res.status(500).send(getInternalServerError());
  }
};
