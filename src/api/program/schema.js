const Joi = require("joi");

const create = Joi.object({
  content: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  title: Joi.string().required(),
  userId: Joi.string().required(),
  programCategoryId: Joi.string().required(),
});

const get = Joi.object({
  id: Joi.string().required(),
});

const update = Joi.object({
  id: Joi.string().required(),
  content: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  title: Joi.string().required(),
  userId: Joi.string().required(),
  programCategoryId: Joi.string().required(),
});

const getAll = Joi.object({
  search: Joi.string().optional().empty("").default(""),
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).max(100).positive().default(5),
  searchByCategory: Joi.string().optional().empty("").default(""),
});

module.exports = {
  create,
  update,
  get,
  getAll,
};
