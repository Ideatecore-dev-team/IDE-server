const prisma = require("../../src/utilities/database");

const categoryData = {
  category: "testCategory",
};

const createTestCategory = async () =>
  await prisma.category.create({ data: categoryData });

const deleteTestCategory = async () => await prisma.category.deleteMany();

const getCategory = async () => {
  const result = await prisma.category.findFirst({
    where: { category: categoryData.category },
  });
  return result;
};

module.exports = {
  categoryData,
  createTestCategory,
  deleteTestCategory,
  getCategory,
};
