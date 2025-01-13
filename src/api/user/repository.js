const prisma = require("../../utilities/database");

const findUserByEmail = async (email) => {
  const result = await prisma.user.findUnique({ where: { email } });
  return result;
};

const createUser = async (data) => {
  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const findUserById = async (id) => {
  const result = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserPassword = async (id, password) => {
  const result = await prisma.user.update({
    where: { id },
    data: { password },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  updateUserPassword,
};
