const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tempUserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  verificationCode: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

const TempUser = mongoose.model("TempUser", tempUserSchema, "tempUsers");
module.exports = TempUser;
