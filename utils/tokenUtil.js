const jwt = require("jsonwebtoken");

module.exports.getToken = user => {
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h"
  });
  return token;
};
