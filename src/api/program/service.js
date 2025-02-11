const schema = require("./schema");
const repository = require("./repository");
const programCategoryRepository = require("../programCategory/repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");

// create
const create = async (request) => {
  const validData = validation(request, schema.create);

  //   check programCategory exist

  const programCategoryExist = await programCategoryRepository.getCategoryById(
    validData.programCategoryId,
  );

  if (!programCategoryExist) {
    throw new responseError(404, "program category not found");
  }

  const result = await repository.create(validData);
  return result;
};

// get by id
const getProgramById = async (request) => {
  const validData = validation(request, schema.get);

  const result = await repository.get(validData.id);

  if (!result) {
    throw new responseError(404, "program not found");
  }

  return result;
};

// update
const updateProgram = async (request) => {
  const validData = validation(request, schema.update);

  //   check program exist
  const programExist = await repository.get(validData.id);
  if (!programExist) {
    throw new responseError(404, "program not found");
  }

  const result = await repository.updateProgramById(validData.id, validData);

  return result;
};

// remove

const deleteProgram = async (request) => {
  const validData = validation(request, schema.get);

  //   check program exist
  const programExist = await repository.get(validData.id);
  if (!programExist) {
    throw new responseError(404, "program not found");
  }

  const result = await repository.deleteProgrameById(validData.id);

  return result;
};

// get all
const getAllProgram = async (request) => {
  const validData = validation(request, schema.getAll);

  const program = await repository.getAllProgram(validData);
  const currentPage = validData.page;
  const perPage = validData.size;
  const totalItems = await repository.totalItems(validData);
  const totalPage = Math.ceil(totalItems / validData.size);

  return {
    program,
    currentPage,
    perPage,
    totalItems,
    totalPage,
  };
};

module.exports = {
  create,
  getProgramById,
  updateProgram,
  deleteProgram,
  getAllProgram,
};
