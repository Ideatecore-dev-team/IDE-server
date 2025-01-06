const schema = require("./schema");
const repository = require("./repository");
const categoryRepository = require("../category/repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");

const create = async (request) => {
  const validData = validation(request, schema.create);

  //   check category exist
  const categoryIsExist = await categoryRepository.getCategoryById(
    validData.categoryId,
  );
  if (!categoryIsExist) {
    throw new responseError(404, "category not found");
  }

  const result = await repository.create(validData);
  return result;
};

const getArticleById = async (request) => {
  const validData = validation(request, schema.get);

  const result = await repository.get(validData.id);
  if (!result) {
    throw new responseError(404, "article not found");
  }

  return result;
};

const updateArticleById = async (request) => {
  const validData = validation(request, schema.update);
  //   check category exist
  const categoryIsExist = await categoryRepository.getCategoryById(
    validData.categoryId,
  );
  if (!categoryIsExist) {
    throw new responseError(404, "category not found");
  }

  //  check article exist
  const articleIsExist = await repository.get(validData.id);
  if (!articleIsExist) {
    throw new responseError(404, "article not found");
  }

  const result = await repository.updateArticleById(validData.id, {
    content: validData.content,
    description: validData.description,
    image: validData.image,
    title: validData.title,
    userId: validData.userId,
    categoryId: validData.categoryId,
  });
  return result;
};

const deleteArticleById = async (request) => {
  const validData = validation(request, schema.get);

  const articleIsExist = await repository.get(validData.id);
  if (!articleIsExist) {
    throw new responseError(404, "article not found");
  }

  const result = await repository.deleteArticleById(validData.id);
  return result;
};

const getAllArticle = async (request) => {
  const validData = validation(request, schema.getAll);

  const article = await repository.getAllArticle(validData);
  const currentPage = validData.page;
  const perPage = validData.size;
  const totalItems = await repository.totalItems(validData);
  const totalPage = Math.ceil(totalItems / validData.size);

  return {
    article,
    currentPage,
    perPage,
    totalItems,
    totalPage,
  };
};

module.exports = {
  create,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  getAllArticle,
};
