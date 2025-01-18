const prisma = require("../../utilities/database");

// create
const create = async (data) => {
  return await prisma.subscribe.create({
    data,
  });
};

// get all
const getAll = async () => {
  return await prisma.subscribe.findMany();
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

module.exports = { create, getAll, getById, update, remove };
