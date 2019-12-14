const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

//Environment variables set
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV == null) {
  dotenv.config({ path: path.resolve(__dirname, "./.env") });
}

//Mongoose initilization
if (!process.env.MONGO_URI) {
  console.log("Stopping server because MONGO_URI is not set");
  process.exit(1);
}
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("error", function(err) {
  console.error("MongoDB error: %s", err);
});

if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true);
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_ID,
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
    accessToken: process.env.EMAIL_ACCESS_TOKEN,
    expires: process.env.EMAIL_EXPIRES
  }
});

module.exports.emailTransporter = transporter;

module.exports.configureApp = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
};
