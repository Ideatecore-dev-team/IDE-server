const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().max(100).required(),
  image: Joi.string().required(),
  link: Joi.string().required(),
});

const get = Joi.object({
  id: Joi.string().required(),
});

const update = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(100).required(),
  image: Joi.string().required(),
  link: Joi.string().required(),
});

module.exports = { create, update, get };
