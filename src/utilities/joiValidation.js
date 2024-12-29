const responseError = require("../error/responseError");

const joiValidation = (request, schema) => (req, res, next) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    throw new responseError(403, `error validation ${result.error.message}`);
  } else {
    return result.value;
  }
};

module.exports = joiValidation;
