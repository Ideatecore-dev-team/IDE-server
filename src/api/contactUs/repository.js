const prisma = require("../../utilities/database");

// create
const create = async (data) => {
  return await prisma.contactUs.create({ data });
};

// get all
const getAll = async () => {
  return await prisma.contactUs.findMany();
};

// get by id
const getById = async (id) => {
  return await prisma.contactUs.findUnique({ where: { id } });
};

// update
const update = async (id, data) => {
  return await prisma.contactUs.update({ where: { id }, data });
};

// remove
const remove = async (id) => {
  return await prisma.contactUs.delete({ where: { id } });
};

module.exports = { create, getAll, getById, update, remove };
