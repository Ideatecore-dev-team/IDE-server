const schema = require("./schema");
const repository = require("./repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");

const create = async (request) => {
  const validData = validation(request, schema.create);

  const categoryIsExist = await repository.findCategoryByName(validData.name);
  if (categoryIsExist) {
    throw new responseError(400, "category already exist");
  }

  const result = await repository.create(validData);
  return result;
};

const getAllTeamCategory = async () => {
  const result = await repository.getAll();

  if (result.length === 0) {
    throw new responseError(404, "team category not found");
  }
  return result;
};

const getAllTeamCategoryById = async (request) => {
  const validData = validation(request, schema.get);

  const result = await repository.getById(validData.id);
  if (!result) {
    throw new responseError(404, "team category not found");
  }

  return result;
};

const update = async (request) => {
  const validData = validation(request, schema.update);

  const categoryIsExist = await repository.getById(validData.id);
  if (!categoryIsExist) {
    throw new responseError(404, "team category not found");
  }

  const result = await repository.update(validData.id, validData.name);
  return result;
};

const deleteCategoryById = async (request) => {
  const validData = validation(request, schema.get);

  const categoryIsExist = await repository.getById(validData.id);
  if (!categoryIsExist) {
    throw new responseError(404, "team category not found");
  }

  const result = await repository.remove(validData.id);
  return result;
};

module.exports = {
  create,
  getAllTeamCategory,
  getAllTeamCategoryById,
  update,
  deleteCategoryById,
};
