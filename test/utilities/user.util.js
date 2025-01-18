const bcrypt = require("bcrypt");
const prisma = require("../../src/utilities/database");
const createToken = require("../../src/utilities/createToken");

const SUPER_ADMIN = {
  email: "superadmin@example.com",
  name: "superadmin",
  password: "superadmin",
  role: "SUPER_ADMIN",
};

const userData = {
  email: "emailtest@example.com",
  name: "nametest",
  password: "passwordtest",
};

const createSuperAdmin = async () => {
  await prisma.user.create({
    data: {
      email: SUPER_ADMIN.email,
      name: SUPER_ADMIN.name,
      password: await bcrypt.hash(SUPER_ADMIN.password, 12),
      role: SUPER_ADMIN.role,
    },
  });
};

const deleteSuperAdmin = async () => {
  await prisma.user.deleteMany({
    where: {
      email: SUPER_ADMIN.email,
    },
  });
};

const getSuperAdminToken = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: SUPER_ADMIN.email,
    },
  });

  const token = createToken({
    id: user.id,
  });

  return token;
};

const createTestUser = async () => {
  await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      password: await bcrypt.hash(userData.password, 12),
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
    // email: user.email,
    // role: user.role,
  });

  return token;
};

const getTestUser = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  return user;
};

module.exports = {
  userData,
  createTestUser,
  deleteTestUser,
  getToken,
  createSuperAdmin,
  deleteSuperAdmin,
  getSuperAdminToken,
  getTestUser,
};
