const Joi = require("joi");

// create
const create = Joi.object({
  image: Joi.string().required(),
});

// get all

// get by id

// update
const update = Joi.object({
  id: Joi.string().required(),
  image: Joi.string().required(),
});

// remove

module.exports = {
  create,
  update,
};
