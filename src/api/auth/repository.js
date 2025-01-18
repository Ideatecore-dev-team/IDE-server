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

// changepassword
const changePassword = async (id, password) => {
  const result = await prisma.user.update({
    where: { id },
    data: { password },
    select: selectData,
  });
  return result;
};

// getuser
const getUser = async (id) => {
  const result = await prisma.user.findUnique({
    where: { id },
    select: selectData,
  });
  return result;
};

module.exports = { findUserByEmail, findUserById, changePassword, getUser };
