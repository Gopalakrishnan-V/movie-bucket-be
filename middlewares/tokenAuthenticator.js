const jwt = require("jsonwebtoken");
const { getInternalServerError } = require("../utils/errorUtil");

module.exports.authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(401).send({
        error: { code: 401, message: "Access token is missing" }
      });
    }
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(403).send({
          error: { code: 403, message: "Invalid access token" }
        });
      }
      req.user = { id: payload.sub };
      next();
    });
  } catch (err) {
    return res.send(getInternalServerError());
  }
};
