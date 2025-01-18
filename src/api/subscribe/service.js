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
const getAll = async (request) => {
  const result = await repository.getAll();
  if (result.length === 0) {
    throw new responseError(404, "subscribe not found");
  }

  return result;
};

// get by id
const getById = async (request) => {
  const validData = validation(request, schema.getById);

  const result = await repository.getById(validData.id);
  if (!result) {
    throw new responseError(404, "subscribe not found");
  }

  return result;
};

// update
const update = async (request) => {
  const validData = validation(request, schema.update);

  const subscribeExist = await repository.getById(validData.id);
  if (!subscribeExist) {
    throw new responseError(404, "subscribe not found");
  }

  const result = await repository.update(validData.id, validData);
  return result;
};

// remove
const remove = async (request) => {
  const validData = validation(request, schema.getById);

  const subscribeExist = await repository.getById(validData.id);
  if (!subscribeExist) {
    throw new responseError(404, "subscribe not found");
  }

  const result = await repository.remove(validData.id);
  return result;
};

module.exports = { create, getAll, getById, update, remove };
