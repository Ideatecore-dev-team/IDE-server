const prisma = require("../../src/utilities/database");

const partnerData = {
  name: "testPartner",
  image: "testImage",
  link: "testLink",
};

// create
const createTestPartner = async () => {
  const result = await prisma.partner.create({ data: partnerData });
  return result;
};

// get
const getTestPartner = async () => {
  const result = await prisma.partner.findFirst();
  return result;
};

// remove
const removeTestPartner = async () => {
  await prisma.partner.deleteMany();
};

module.exports = {
  partnerData,
  createTestPartner,
  getTestPartner,
  removeTestPartner,
};
