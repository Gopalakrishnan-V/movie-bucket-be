const _random = require("lodash/random");

module.exports.getRandomCode = (length = 6) => {
  let code = "";
  for (let i = 1; i <= length; i++) {
    code += _random(9);
  }
  return code;
};
