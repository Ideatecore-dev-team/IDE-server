const schema = require("./schema");
const repository = require("./repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");

// create
const create = async (request) => {
  const validData = validation(request, schema.create);

  //   check partner exist
  const partnerIsExist = await repository.checkPartnerExist(validData.name);
  if (partnerIsExist) {
    throw new responseError(400, "partner already exist");
  }

  const result = await repository.create(validData);
  return result;
};

// get all
const getAll = async (request) => {
  const validData = validation(request, schema.getAll);

  const partner = await repository.getAll(validData);

  if (partner.length === 0) {
    throw new responseError(404, "partner not found");
  }
  const totalItems = await repository.totalItems();
  const currentPage = validData.page;
  const perPage = validData.size;
  const totalPage = Math.ceil(totalItems / validData.size);

  return {
    partner,
    currentPage,
    perPage,
    totalItems,
    totalPage,
  };
};

// get by id
const getById = async (request) => {
  const validData = validation(request, schema.get);

  const result = await repository.getById(validData.id);
  if (!result) {
    throw new responseError(404, "partner not found");
  }

  return result;
};

// update
const update = async (request) => {
  const validData = validation(request, schema.update);

  const partnerExist = await repository.getById(validData.id);
  if (!partnerExist) {
    throw new responseError(404, "partner not found");
  }

  const result = await repository.update(validData.id, validData);
  return result;
};

// remove
const remove = async (request) => {
  const validData = validation(request, schema.get);

  const partnerExist = await repository.getById(validData.id);
  if (!partnerExist) {
    throw new responseError(404, "partner not found");
  }

  const result = await repository.remove(validData.id);
  return result;
};

module.exports = { create, getAll, getById, update, remove };
