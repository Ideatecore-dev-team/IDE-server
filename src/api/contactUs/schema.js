const Joi = require("joi");

// create
const create = Joi.object({
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  message: Joi.string().required(),
});

// get by id
const getById = Joi.object({
  id: Joi.string().required(),
});

// update
const update = Joi.object({
  id: Joi.string().required(),
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  message: Joi.string().required(),
});

module.exports = { create, update, getById };
