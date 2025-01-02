const bcrypt = require("bcrypt");
const schema = require("./schema");
const repository = require("./repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");
const createToken = require("../../utilities/createToken");

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
    email: user.email,
    role: user.role,
  });

  return { token };
};

const getUser = async (request) => {
  const validData = validation(request, schema.getUser);

  const user = await repository.findUserById(validData.id);
  if (!user) {
    throw new responseError(404, "user not found");
  }

  return user;
};

const changePassword = async (request) => {
  const validData = validation(request, schema.changePassword);

  const user = await repository.findUserById(validData.id);
  if (!user) {
    throw new responseError(404, "user not found");
  }

  const userEmail = await repository.findUserByEmail(user.email);
  if (!userEmail) {
    throw new responseError(404, "user not found");
  }

  const isPasswordValid = await bcrypt.compare(
    validData.oldPassword,
    userEmail.password,
  );

  if (!isPasswordValid) {
    throw new responseError(401, "old password is wrong");
  }

  const hashedPassword = await bcrypt.hash(validData.newPassword, 10);

  const result = await repository.updateUserPassword(
    validData.id,
    hashedPassword,
  );

  return result;
};

module.exports = {
  register,
  login,
  getUser,
  changePassword,
};
