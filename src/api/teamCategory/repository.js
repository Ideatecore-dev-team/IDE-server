const prisma = require("../../utilities/database");

const create = async (data) => {
  const result = await prisma.categoryTeam.create({ data });
  return result;
};

const findCategoryByName = async (categoryName) => {
  const result = await prisma.categoryTeam.findFirst({
    where: { name: categoryName },
  });
  return result;
};

const getById = async (id) => {
  const result = await prisma.categoryTeam.findUnique({ where: { id } });
  return result;
};

const getAll = async () => {
  const result = await prisma.categoryTeam.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return result;
};

const update = async (id, name) => {
  const result = await prisma.categoryTeam.update({
    where: { id },
    data: { name: name },
  });
  return result;
};

const remove = async (id) => {
  const result = await prisma.categoryTeam.delete({ where: { id } });
  return result;
};

module.exports = {
  create,
  findCategoryByName,
  getById,
  getAll,
  update,
  remove,
};
