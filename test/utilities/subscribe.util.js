const prisma = require("../../src/utilities/database");

const subscribeData = {
  email: "emailtest@example.com",
};

const createTestSubscribe = async () => {
  await prisma.subscribe.create({ data: subscribeData });
};

const deleteTestSubscribe = async () => {
  await prisma.subscribe.deleteMany();
};

const getTestSubscribe = async () => {
  const result = await prisma.subscribe.findFirst({
    where: { email: subscribeData.email },
  });
  return result;
};

module.exports = {
  subscribeData,
  createTestSubscribe,
  deleteTestSubscribe,
  getTestSubscribe,
};
