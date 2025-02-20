const prisma = require("../../utilities/database");

const checkPartnerExist = async (name) => {
  const result = await prisma.partner.findFirst({
    where: { name },
  });
  return result;
};

const select = {
  id: true,
  name: true,
  image: true,
  link: true,
  createdAt: true,
  updatedAt: true,
};

// create
const create = async (data) => {
  const result = await prisma.partner.create({
    data,
    select,
  });
  return result;
};

// getAll
const getAll = async (data) => {
  const result = await prisma.partner.findMany({
    select,
    orderBy: { createdAt: "desc" },
    skip: (data.page - 1) * data.size || 0,
    take: data.size || 10,
  });
  return result;
};

const totalItems = async () => {
  const result = await prisma.partner.count();

  return result;
};

// getById
const getById = async (id) => {
  const result = await prisma.partner.findUnique({
    where: { id },
    select,
  });
  return result;
};

// update
const update = async (id, data) => {
  const result = await prisma.partner.update({
    where: { id },
    data,
    select,
  });
  return result;
};

// remove
const remove = async (id) => {
  const result = await prisma.partner.delete({ where: { id }, select });
  return result;
};

module.exports = {
  checkPartnerExist,
  create,
  getAll,
  getById,
  update,
  remove,
  totalItems,
};
