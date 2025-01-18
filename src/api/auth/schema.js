const Joi = require("joi");

// login
const login = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
});

// changepassword
const changePassword = Joi.object({
  id: Joi.string().required(),
  oldPassword: Joi.string().max(100).required(),
  newPassword: Joi.string().max(100).required(),
});

// getuser
const getUser = Joi.object({
  id: Joi.string().required(),
});

module.exports = { login, getUser, changePassword };
