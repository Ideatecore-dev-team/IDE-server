const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().max(100).required().lowercase(),
});

const get = Joi.object({
  id: Joi.string().required(),
});

const update = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(100).required().lowercase(),
});

module.exports = { create, update, get };
