const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favoritePersonSchema = new Schema({
  person_id: { type: Number, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String },
  known_for_department: { type: String },
  poster_path: { type: String },
  birthday: { type: String },
  added_at: { type: Date, default: Date.now }
});

const FavoritePerson = mongoose.model(
  "FavoritePerson",
  favoritePersonSchema,
  "favoritePersons"
);
module.exports = FavoritePerson;
