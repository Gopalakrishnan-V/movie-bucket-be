const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const genreSchema = new Schema({
  id: { type: Number },
  name: { type: String }
});

const favoriteMovieSchema = new Schema({
  movie_id: { type: Number, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
  genres: { type: [genreSchema], required: true },
  original_language: { type: String },
  original_title: { type: String, required: true },
  poster_path: { type: String, required: true },
  release_date: { type: String },
  runtime: { type: Number },
  title: { type: String, required: true },
  vote_average: { type: Number },
  added_at: { type: Date, default: Date.now }
});
favoriteMovieSchema.plugin(mongoosePaginate);

const FavoriteMovie = mongoose.model(
  "FavoriteMovie",
  favoriteMovieSchema,
  "favoriteMovies"
);
module.exports = FavoriteMovie;
