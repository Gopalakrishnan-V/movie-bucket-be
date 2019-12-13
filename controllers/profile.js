const User = require("../models/user");
const { getInternalServerError } = require("../utils/errorUtil");

module.exports.showMe = async (req, res) => {
  const userId = req.user.id;
  try {
    const me = await User.findOne({ _id: userId });
    if (!me) {
      return res.send(getInternalServerError());
    }
    const { _id, name, email } = me;
    return res.send({ data: { _id, name, email } });
  } catch (err) {
    return res.send(getInternalServerError());
  }
};
