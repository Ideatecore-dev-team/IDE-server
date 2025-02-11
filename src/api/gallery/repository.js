const prisma = require("../../utilities/database");

// create
const create = async (data) => await prisma.gallery.create({ data });

// get all
const get = async () => await prisma.gallery.findMany();

// get by id
const getById = async (id) => await prisma.gallery.findFirst({ where: { id } });

// update
const updateById = async (id, data) =>
  await prisma.gallery.update({
    where: { id },
    data,
  });

// remove

module.exports = { create, get, getById, updateById };
