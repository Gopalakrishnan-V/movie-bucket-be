const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  type: { type: String, required: true }
});

const Favorite = mongoose.model("Favorite", favoriteSchema, "favorites");
module.exports = Favorite;
