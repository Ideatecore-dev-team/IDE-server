const Joi = require("joi");

const register = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
  name: Joi.string().max(100).required(),
});

const getById = Joi.object({
  id: Joi.string().required(),
});

const update = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(100).required(),
});

const updatePassword = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().max(100).required(),
});

module.exports = { register, update, getById, updatePassword };
