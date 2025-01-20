const bcrypt = require("bcrypt");
const prisma = require("../../src/utilities/database");
const createToken = require("../../src/utilities/createToken");

const SUPER_ADMIN = {
  email: "superadmintest@example.com",
  name: "superadmin",
  password: "superadmin",
  role: "SUPER_ADMIN",
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

const createManyTestUser = async () => {
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        email: `emailtest${i}@example.com`,
        name: `nametest${i}`,
        password: await bcrypt.hash(`passwordtest${i}`, 12),
      },
    });
  }
};

const getToken = async () => {
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

const runCode = async () => {
  await createSuperAdmin();
  // await createManyTestUser();
  const token = await getToken();
  console.log(token);
  return token;
};

runCode();
