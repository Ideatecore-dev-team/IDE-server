const Joi = require("joi");

// create
const create = Joi.object({
  email: Joi.string().email().max(100).required(),
});

// get by id
const getById = Joi.object({
  id: Joi.string().required(),
});

// update
const update = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email().max(100).required(),
});

module.exports = { create, update, getById };
