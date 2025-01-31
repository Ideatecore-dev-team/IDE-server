const prisma = require("../../utilities/database");

const create = async (data) => {
  const result = await prisma.category.create({
    data,
    // select: {
    //   id: true,
    //   category: true,
    //   createdAt: true,
    //   updatedAt: true,
    // },
  });
  return result;
};

const findCategoryByName = async (category) => {
  const result = await prisma.category.findFirst({ where: { category } });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      category: "asc",
    },
  });
  return result;
};

const getCategoryById = async (id) => {
  const result = await prisma.category.findUnique({ where: { id } });
  return result;
};

const updateCategoryById = async (id, category) => {
  const result = await prisma.category.update({
    where: { id },
    data: { category },
  });
  return result;
};

const deleteCategoryById = async (id) => {
  const result = await prisma.category.delete({ where: { id } });
  return result;
};

module.exports = {
  create,
  findCategoryByName,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
