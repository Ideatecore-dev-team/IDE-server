const Joi = require("joi");

const register = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
  name: Joi.string().max(100).required(),
});

const login = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
});

const getUser = Joi.object({
  id: Joi.string().required(),
});

const changePassword = Joi.object({
  id: Joi.string().required(),
  oldPassword: Joi.string().max(100).required(),
  newPassword: Joi.string().max(100).required(),
});

module.exports = { register, login, getUser, changePassword };
