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

module.exports = { create };
