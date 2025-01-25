const bcrypt = require("bcrypt");
const schema = require("./schema");
const repository = require("./repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");

// register
const register = async (request) => {
  const validData = validation(request, schema.register);

  const user = await repository.findUserByEmail(validData.email);
  if (user) {
    throw new responseError(400, "email already exist");
  }

  validData.password = await bcrypt.hash(validData.password, 12);

  const result = await repository.createUser(validData);

  return result;
};

// get all user
const getAllUser = async () => {
  const result = await repository.getAllUser();

  if (result.length === 0) {
    throw new responseError(404, "user not found");
  }

  return result;
};

// get user by id
const getUserById = async (request) => {
  const validData = validation(request, schema.getById);

  const user = await repository.getUserById(validData.id);
  if (!user) {
    throw new responseError(404, "user not found");
  }

  return user;
};

// update user by id
const updateUserById = async (request) => {
  const validData = validation(request, schema.update);

  const user = await repository.getUserById(validData.id);
  if (!user) {
    throw new responseError(404, "user not found");
  }

  // active this in production
  if (user.role === "SUPER_ADMIN") {
    throw new responseError(400, "cannot update super admin");
  }

  const result = await repository.updateUserById(validData.id, validData.name);
  return result;
};

const updatePasswordById = async (request) => {
  const validData = validation(request, schema.updatePassword);

  const user = await repository.getUserById(validData.id);
  if (!user) {
    throw new responseError(404, "user not found");
  }

  // active this in production
  if (user.role === "SUPER_ADMIN") {
    throw new responseError(400, "cannot change password super admin");
  }

  validData.password = await bcrypt.hash(validData.password, 12);

  const result = await repository.updatePasswordById(
    validData.id,
    validData.password,
  );
  return result;
};

// remove user by id
const remove = async (request) => {
  const validData = validation(request, schema.getById);

  const user = await repository.getUserById(validData.id);
  if (!user) {
    throw new responseError(404, "user not found");
  }

  // active this in production
  if (user.role === "SUPER_ADMIN") {
    throw new responseError(400, "cannot delete super admin");
  }

  const result = await repository.remove(validData.id);
  return result;
};

module.exports = {
  register,
  getAllUser,
  getUserById,
  updateUserById,
  updatePasswordById,
  remove,
};
