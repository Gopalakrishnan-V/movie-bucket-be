const ObjectID = require("mongodb").ObjectID;

module.exports.isValidObjectId = id => {
  return ObjectID.isValid(id);
};
