const Joi = require("joi");

const register = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
  name: Joi.string().max(100).required(),
});

module.exports = { register };
