module.exports.getInternalServerError = () => {
  return { error: { code: 500, message: "Something went wrong" } };
};
