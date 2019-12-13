const Joi = require("@hapi/joi");
const { isValidObjectId } = require("../utils/mongoUtil");

module.exports.validateFavoriteMovieAddition = async (req, res, next) => {
  const genreSchema = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string()
  });

  const schema = Joi.object({
    movie_id: Joi.number().required(),
    genres: Joi.array()
      .items(genreSchema)
      .required(),
    original_language: Joi.string(),
    original_title: Joi.string().required(),
    poster_path: Joi.string().required(),
    release_date: Joi.string(),
    runtime: Joi.number(),
    title: Joi.string().required(),
    vote_average: Joi.number()
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: { code: 400, message: error.message }
    });
  }
  next();
};

module.exports.validateFavoriteMovieDeletion = async (req, res, next) => {
  const { id } = req.params;
  if (id == null || !isValidObjectId(id)) {
    return res.status(400).send({
      error: { code: 400, message: "invalid favorite movie id" }
    });
  }
  next();
};

module.exports.validateIsFavoriteMovieCheck = async (req, res, next) => {
  const schema = Joi.object({
    movie_id: Joi.number().required()
  });

  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(400).send({
      error: { code: 400, message: error.message }
    });
  }
  next();
};
