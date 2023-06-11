const Joi = require("joi");
const {ValidationError} = require("./Error");

const validateRequest = (schema) => (req, res, next) => {
  const {value, error} = Joi.compile(schema)
      .validate(req.body, {abortEarly: false});

  if (error) {
    const errorMessage = error.details
        .map((details) => ({
          [details.context.key]: details.message.replace(/"/g, ""),
        }));
    return next(new ValidationError(errorMessage));
  }

  Object.assign(req, value);
  return next();
};

module.exports = {
  validateRequest
};
