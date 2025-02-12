const schema = require("./schema");
const repository = require("./repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");

// create
const create = async (request) => {
  const validData = validation(request, schema.create);

  const companyInfoIsExist = await repository.get();
  if (companyInfoIsExist) {
    throw new responseError(400, "company info already exist");
  }

  const result = await repository.create(validData);
  return result;
};

// get
const get = async () => {
  const result = await repository.get();

  if (!result) {
    throw new responseError(404, "company info not found");
  }
  return result;
};

// get by id

// update
const update = async (request) => {
  const validData = validation(request, schema.update);

  const companyInfoIsExist = await repository.get();
  if (!companyInfoIsExist) {
    throw new responseError(404, "company info not found");
  }

  const result = await repository.update(validData);
  return result;
};

module.exports = { create, get, update };
