const bcrypt = require("bcrypt");
const User = require("../models/user");
const TempUser = require("../models/tempUser");
const { addMinutesToDate } = require("../utils/dateTimeUtil");
const { getRandomCode } = require("../utils/randomUtil");
const _capitalize = require("lodash/capitalize");
const { getInternalServerError } = require("../utils/errorUtil");
const { getToken } = require("../utils/tokenUtil");
const { sendVerificationEmail } = require("../utils/emailUtil");

module.exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.password) {
      // User already registered using email and password
      return res.status(400).send({
        error: 400,
        message: '"user" with given email already exists'
      });
    } else {
      // User already registered via Facebook or Google (or)
      // User with email does not exists
      // Thus creating a new temp user
      const name = email && _capitalize(email.split("@")[0]);
      const verificationCode = getRandomCode();
      const expiresAt = addMinutesToDate(new Date(), 5);
      expiresAt.set;
      let tempUser = new TempUser({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        verificationCode,
        expiresAt
      });
      tempUser = await tempUser.save();

      await sendVerificationEmail(email, verificationCode);

      return res.send({ message: `verification code sent to ${email}` });
    }
  } catch (err) {
    return res.status(500).send(getInternalServerError());
  }
};

module.exports.activate = async (req, res) => {
  const { email, verificationCode } = req.body;
  try {
    const tempUser = await TempUser.findOne({
      email,
      verificationCode,
      expiresAt: { $gte: new Date() }
    });
    if (!tempUser) {
      return res.status(400).send({
        error: {
          code: 400,
          message: "verification code is not correct or timed out"
        }
      });
    } else {
      let existingUser = await User.findOne({ email });
      if (existingUser && !existingUser.password) {
        // Check whether password is present
        // If not pass not there, then he created account using Fb or Google
        // add password to the user document
        existingUser.password = tempUser.password;
        existingUser = await existingUser.save();
        await tempUser.remove();
        return res.send({
          data: {
            _id: existingUser.id,
            name: existingUser.name,
            accessToken: getToken(existingUser),
            message: "merged with existing account successfully"
          }
        });
      } else {
        // Create new user
        let newUser = new User({
          name: tempUser.name,
          email: tempUser.email,
          password: tempUser.password
        });
        newUser = await newUser.save();
        await tempUser.remove();
        return res.send({
          data: {
            _id: newUser.id,
            name: newUser.name,
            accessToken: getToken(newUser),
            message: "new account created successfully"
          }
        });
      }
    }
  } catch (err) {
    return res.status(500).send(getInternalServerError());
  }
};

module.exports.loginWithEmail = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      // User does not exists or User registered via Fb or Google
      return res
        .status(400)
        .send({ error: { message: "invalid email or password", code: 400 } });
    } else {
      const hashedPassword = user.password;
      if (await bcrypt.compare(password, hashedPassword)) {
        // Valid user
        return res.send({
          data: {
            _id: user.id,
            name: user.name,
            accessToken: getToken(user),
            message: "loggedin successfully"
          }
        });
      } else {
        // Password mismatch
        return res
          .status(400)
          .send({ error: { message: "invalid email or password", code: 400 } });
      }
    }
  } catch (err) {
    return res.status(500).send(getInternalServerError());
  }
};
