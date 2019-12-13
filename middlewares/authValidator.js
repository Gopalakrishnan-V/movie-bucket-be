const Joi = require("@hapi/joi");

module.exports.validateRegistration = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .max(30)
      .required(),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .error(new Error('"passwords" must match'))
  }).options({ abortEarly: true });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: { code: 400, message: error.message }
    });
  }
  next();
};

module.exports.validateActivation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    verificationCode: Joi.string()
      .min(4)
      .max(30)
      .required()
  }).options({ abortEarly: true });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: { code: 400, message: error.message }
    });
  }
  next();
};

module.exports.validateEmailAuthentication = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .max(30)
      .required()
  }).options({ abortEarly: true });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: { code: 400, message: error.message }
    });
  }
  next();
};
