const schema = require("./schema");
const repository = require("./repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");

const create = async (request) => {
  const validData = validation(request, schema.create);

  //   check category team exist
  const categoryIsExist = await repository.checkCategoryExist(
    validData.categoryTeamId,
  );
  if (!categoryIsExist) {
    throw new responseError(404, "category not found");
  }

  const result = await repository.create(validData);
  return result;
};
// get all
const getAll = async (request) => {
  const validData = validation(request, schema.getAll);
  const team = await repository.getAll(validData);

  if (team.length === 0) {
    throw new responseError(404, "team not found");
  }

  const totalItems = await repository.totalItems();
  const currentPage = validData.page;
  const perPage = validData.size;
  const totalPage = Math.ceil(totalItems / validData.size);

  return {
    team,
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
    throw new responseError(404, "team not found");
  }

  return result;
};

// update
const update = async (request) => {
  const validData = validation(request, schema.update);

  const categoryIsExist = await repository.checkCategoryExist(
    validData.categoryTeamId,
  );
  if (!categoryIsExist) {
    throw new responseError(404, "category not found");
  }

  const teamExist = await repository.getById(validData.id);
  if (!teamExist) {
    throw new responseError(404, "team not found");
  }

  const result = await repository.update(validData.id, validData);
  return result;
};

// remove
const remove = async (request) => {
  const validData = validation(request, schema.get);

  const teamExist = await repository.getById(validData.id);
  if (!teamExist) {
    throw new responseError(404, "team not found");
  }

  const result = await repository.remove(validData.id);
  return result;
};

module.exports = { create, getAll, getById, update, remove };
