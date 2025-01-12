const Joi = require("joi");

// create
const create = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().required(),
  title: Joi.string().max(100).required(),
  image: Joi.string().required(),
  Phone: Joi.string().required(),
  Email: Joi.string().required(),
  Address: Joi.string().required(),
  Facebook: Joi.string().required(),
  Instagram: Joi.string().required(),
  Twitter: Joi.string().required(),
  Linkedin: Joi.string().required(),
  Youtube: Joi.string().required(),
  Tiktok: Joi.string().required(),
});

// update
const update = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().required(),
  title: Joi.string().max(100).required(),
  image: Joi.string().required(),
  Phone: Joi.string().required(),
  Email: Joi.string().required(),
  Address: Joi.string().required(),
  Facebook: Joi.string().required(),
  Instagram: Joi.string().required(),
  Twitter: Joi.string().required(),
  Linkedin: Joi.string().required(),
  Youtube: Joi.string().required(),
  Tiktok: Joi.string().required(),
});

module.exports = { create, update };
