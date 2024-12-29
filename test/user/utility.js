const prisma = require("../../src/utilities/database");

const userData = {
  email: "emailtest@example.com",
  name: "nametest",
  password: "passwordtest",
};

const createTestUser = async () => {
  await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      password: userData.password,
    },
  });
};

const deleteTestUser = async () => {
  await prisma.user.deleteMany({
    where: {
      email: userData.email,
    },
  });
};

module.exports = { userData, createTestUser, deleteTestUser };
