const Joi = require("joi");

const create = Joi.object({
  category: Joi.string().max(100).required(),
});

const get = Joi.object({
  id: Joi.string().required(),
});

const update = Joi.object({
  id: Joi.string().required(),
  category: Joi.string().max(100).required(),
});

module.exports = { create, update, get };
