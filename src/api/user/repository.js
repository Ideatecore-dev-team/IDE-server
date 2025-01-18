const prisma = require("../../utilities/database");

const selectData = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

const findUserByEmail = async (email) =>
  await prisma.user.findUnique({ where: { email } });

const findUserById = async (id) =>
  await prisma.user.findUnique({ where: { id } });

// register
const createUser = async (data) => {
  const result = await prisma.user.create({
    data,
    select: selectData,
  });
  return result;
};

// get all user
const getAllUser = async () =>
  await prisma.user.findMany({ select: selectData });

// get user by id
const getUserById = async (id) => {
  const result = await prisma.user.findUnique({
    where: { id },
    select: selectData,
  });
  return result;
};

// update user by id
const updateUserById = async (id, name) => {
  const result = await prisma.user.update({
    where: { id },
    data: { name },
    select: selectData,
  });
  return result;
};

const updatePasswordById = async (id, password) => {
  const result = await prisma.user.update({
    where: { id },
    data: { password },
    select: selectData,
  });
  return result;
};

// remove user by id
const remove = async (id) => {
  const result = await prisma.user.delete({
    where: { id },
    select: selectData,
  });
  return result;
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  getAllUser,
  getUserById,
  updateUserById,
  updatePasswordById,
  remove,
};
