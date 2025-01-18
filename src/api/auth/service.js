const bcrypt = require("bcrypt");
const schema = require("./schema");
const repository = require("./repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");
const createToken = require("../../utilities/createToken");

// login
const login = async (request) => {
  const validData = validation(request, schema.login);

  const user = await repository.findUserByEmail(validData.email);
  if (!user) {
    throw new responseError(401, "email or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    validData.password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new responseError(401, "email or password is wrong");
  }

  const token = createToken({
    id: user.id,
  });

  return { token };
};

// changepassword
const changePassword = async (request) => {
  const validData = validation(request, schema.changePassword);

  const user = await repository.findUserById(validData.id);
  const isPasswordValid = await bcrypt.compare(
    validData.oldPassword,
    user.password,
  );

  if (!isPasswordValid) {
    throw new responseError(401, "old password is wrong");
  }

  const hashedPassword = await bcrypt.hash(validData.newPassword, 12);

  const result = await repository.changePassword(validData.id, hashedPassword);

  return result;
};

// getuser
const getUser = async (request) => {
  const validData = validation(request, schema.getUser);

  const user = await repository.getUser(validData.id);
  if (!user) {
    throw new responseError(404, "user not found");
  }

  return user;
};

module.exports = { login, changePassword, getUser };
