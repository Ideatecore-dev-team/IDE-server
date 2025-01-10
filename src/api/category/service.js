const schema = require("./schema");
const repository = require("./repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");

const create = async (request) => {
  const validData = validation(request, schema.create);

  const categoryIsExist = await repository.findCategoryByName(
    validData.category,
  );
  if (categoryIsExist) {
    throw new responseError(400, "category already exist");
  }

  const result = await repository.create(validData);
  return result;
};

const getAllCategory = async () => {
  const result = await repository.getAllCategory();
  if (result.length === 0) {
    throw new responseError(404, "category not found");
  }

  return result;
};

const getCategoryById = async (request) => {
  const validData = validation(request, schema.get);

  const result = await repository.getCategoryById(validData.id);
  if (!result) {
    throw new responseError(404, "category not found");
  }

  return result;
};

const updateCategoryById = async (request) => {
  const validData = validation(request, schema.update);

  const categoryIsExist = await repository.getCategoryById(validData.id);
  if (!categoryIsExist) {
    throw new responseError(404, "category not found");
  }

  const result = await repository.updateCategoryById(
    validData.id,
    validData.category,
  );
  return result;
};

const deleteCategoryById = async (request) => {
  const validData = validation(request, schema.get);

  const categoryIsExist = await repository.getCategoryById(validData.id);
  if (!categoryIsExist) {
    throw new responseError(404, "category not found");
  }

  const result = await repository.deleteCategoryById(validData.id);
  return result;
};

module.exports = {
  create,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
