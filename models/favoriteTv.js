const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const genreSchema = new Schema({
  id: { type: Number },
  name: { type: String }
});

const favoriteTvSchema = new Schema({
  tv_id: { type: Number, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String },
  original_name: { type: String },
  poster_path: { type: String },
  genres: { type: [genreSchema] },
  first_air_date: { type: String },
  number_of_episodes: { type: Number },
  number_of_seasons: { type: Number },
  original_language: { type: String },
  type: { type: String },
  vote_average: { type: Number },
  added_at: { type: Date, default: Date.now }
});

const FavoriteTv = mongoose.model(
  "FavoriteTv",
  favoriteTvSchema,
  "favoriteTvs"
);
module.exports = FavoriteTv;
