const bcrypt = require("bcrypt");
const schema = require("./schema");
const repository = require("./repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");

const register = async (request) => {
  const validData = validation(request, schema.register);

  const user = await repository.findUserByEmail(validData.email);
  if (user) {
    throw new responseError(400, "email already exist");
  }

  validData.password = await bcrypt.hash(validData.password, 10);

  const result = await repository.createUser(validData);

  return result;
};

module.exports = {
  register,
};
