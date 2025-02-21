const Joi = require("joi");

// create
const create = Joi.object({
  email: Joi.string().email().max(100).required(),
});

// get by id
const getById = Joi.object({
  id: Joi.string().required(),
});

const getAll = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).max(100).positive().default(10),
});

// update
const update = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email().max(100).required(),
});

module.exports = { create, update, getById, getAll };
