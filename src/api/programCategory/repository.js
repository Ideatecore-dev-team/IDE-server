const prisma = require("../../utilities/database");

const create = async (data) => {
  const result = await prisma.programCategory.create({
    data,
  });
  return result;
};

const findCategoryByName = async (name) => {
  const result = await prisma.programCategory.findFirst({
    where: { name },
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.programCategory.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return result;
};

const getCategoryById = async (id) => {
  const result = await prisma.programCategory.findUnique({ where: { id } });
  return result;
};

const updateCategoryById = async (id, name) => {
  const result = await prisma.programCategory.update({
    where: { id },
    data: { name },
  });
  return result;
};

const deleteCategoryById = async (id) => {
  const result = await prisma.programCategory.delete({ where: { id } });
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
