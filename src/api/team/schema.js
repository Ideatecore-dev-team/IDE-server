const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().max(100).required(),
  position: Joi.string().max(100).optional(),
  image: Joi.string().optional(),
  link: Joi.string().optional(),
  categoryTeamId: Joi.string().required(),
});

const get = Joi.object({
  id: Joi.string().required(),
});

const getAll = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).max(100).positive().default(10),
});

const update = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(100).required(),
  position: Joi.string().max(100).optional(),
  image: Joi.string().optional(),
  link: Joi.string().optional(),
  categoryTeamId: Joi.string().required(),
});

module.exports = { create, update, get, getAll };
