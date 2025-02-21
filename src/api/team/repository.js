const prisma = require("../../utilities/database");

// check category exist by categoryTeamId
const checkCategoryExist = async (categoryTeamId) => {
  const result = await prisma.categoryTeam.findUnique({
    where: { id: categoryTeamId },
  });
  return result;
};

// select
const select = {
  id: true,
  name: true,
  position: true,
  image: true,
  link: true,
  categoryTeamId: true,
  CategoryTeam: {
    select: {
      name: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};

// create
const create = async (data) => {
  const result = await prisma.team.create({ data: data, select });
  return result;
};

// getAll
const getAll = async (data) => {
  const result = await prisma.team.findMany({
    select,
    skip: (data.page - 1) * data.size || 0,
    take: data.size || 10,
  });
  return result;
};

const totalItems = async () => {
  const result = await prisma.team.count();

  return result;
};

// getById
const getById = async (id) => {
  const result = await prisma.team.findUnique({
    where: { id },
    select,
  });
  return result;
};

// update
const update = async (id, data) => {
  const result = await prisma.team.update({
    where: { id },
    data: data,
    select,
  });
  return result;
};

// remove
const remove = async (id) => {
  const result = await prisma.team.delete({ where: { id }, select });
  return result;
};

module.exports = {
  checkCategoryExist,
  create,
  getAll,
  getById,
  update,
  remove,
  totalItems,
};
