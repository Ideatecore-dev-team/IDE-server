const prisma = require("../../utilities/database");

// create
const create = async (data) => {
  return await prisma.subscribe.create({
    data,
  });
};

// get all
const getAll = async (data) => {
  const result = await prisma.subscribe.findMany({
    skip: (data.page - 1) * data.size || 0,
    take: data.size || 10,
  });

  return result;
};

const totalItems = async () => {
  const result = await prisma.subscribe.count();

  return result;
};

// get by id
const getById = async (id) => {
  return await prisma.subscribe.findUnique({
    where: { id },
  });
};

// update
const update = async (id, data) => {
  return await prisma.subscribe.update({
    where: { id },
    data,
  });
};

// remove
const remove = async (id) => {
  return await prisma.subscribe.delete({
    where: { id },
  });
};

module.exports = { create, getAll, getById, update, remove, totalItems };
