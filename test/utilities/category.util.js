const prisma = require("../../src/utilities/database");

const categoryData = {
  category: "testCategory",
};

const createTestCategory = async () =>
  await prisma.category.create({ data: categoryData });

const deleteTestCategory = async () =>
  await prisma.category.deleteMany({
    where: { category: categoryData.category },
  });

module.exports = { categoryData, createTestCategory, deleteTestCategory };
