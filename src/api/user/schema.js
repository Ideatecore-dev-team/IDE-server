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

const getAll = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).max(100).positive().default(10),
});

const updatePassword = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().max(100).required(),
});

module.exports = { register, update, getById, updatePassword, getAll };
