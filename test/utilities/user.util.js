const bcrypt = require("bcrypt");
const prisma = require("../../src/utilities/database");
const createToken = require("../../src/utilities/createToken");

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
      password: await bcrypt.hash(userData.password, 10),
    },
  });
};

const deleteTestUser = async () => {
  await prisma.user.deleteMany({
    // where: {
    //   email: userData.email,
    // },
  });
};

const getToken = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  const token = createToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return token;
};

module.exports = { userData, createTestUser, deleteTestUser, getToken };
