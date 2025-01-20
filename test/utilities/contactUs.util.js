const prisma = require("../../src/utilities/database");

const contactUsData = {
  firstName: "firstName",
  lastName: "lastName",
  email: "emailtest@example.com",
  message: "testMessage",
};

const createTestContactUs = async () => {
  await prisma.contactUs.create({
    data: contactUsData,
  });
};

const deleteTestContactUs = async () => {
  await prisma.contactUs.deleteMany();
};

const getTestContactUs = async () => {
  return await prisma.contactUs.findFirst();
};

module.exports = {
  contactUsData,
  createTestContactUs,
  deleteTestContactUs,
  getTestContactUs,
};
