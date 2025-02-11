const prisma = require("../../utilities/database");

// create
const create = async (data) => {
  const result = await prisma.companyInfo.create({ data });
  return result;
};

// get
const get = async () => {
  const result = await prisma.companyInfo.findFirst();
  return result;
};

// update
const update = async (data) => {
  const result = await prisma.companyInfo.update({
    where: { id: data.id },
    data,
  });
  return result;
};

module.exports = { create, get, update };
