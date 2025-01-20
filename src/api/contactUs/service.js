const schema = require("./schema");
const repository = require("./repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");

// create
const create = async (request) => {
  const validData = validation(request, schema.create);
  const result = await repository.create(validData);
  return result;
};

// get all
const getAll = async () => {
  const result = await repository.getAll();
  if (result.length === 0) {
    throw new responseError(404, "contact us not found");
  }

  return result;
};

// get by id
const getById = async (request) => {
  const validData = validation(request, schema.getById);

  const result = await repository.getById(validData.id);
  if (!result) {
    throw new responseError(404, "contact us not found");
  }

  return result;
};

// update
const update = async (request) => {
  const validData = validation(request, schema.update);

  const contactUsExist = await repository.getById(validData.id);
  if (!contactUsExist) {
    throw new responseError(404, "contact us not found");
  }

  const result = await repository.update(validData.id, validData);
  return result;
};

// remove
const remove = async (request) => {
  const validData = validation(request, schema.getById);

  const contactUsExist = await repository.getById(validData.id);
  if (!contactUsExist) {
    throw new responseError(404, "contact us not found");
  }

  const result = await repository.remove(validData.id);
  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
