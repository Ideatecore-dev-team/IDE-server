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

module.exports = { findUserByEmail, createUser };
