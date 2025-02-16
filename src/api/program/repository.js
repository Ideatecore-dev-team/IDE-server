const prisma = require("../../utilities/database");

const programSelect = {
  id: true,
  content: true,
  description: true,
  image: true,
  title: true,
  userId: true,
  programCategoryId: true,
  createdAt: true,
  updatedAt: true,
  User: {
    select: {
      name: true,
    },
  },
  ProgramCategory: {
    select: {
      name: true,
    },
  },
};

const getSearchProgramFilter = (data) => {
  const filter = {
    OR: ["title", "description"].map((field) => ({
      [field]: { contains: data.search, mode: "insensitive" },
    })),
  };

  // Filter by category if provided
  if (data.searchByCategory) {
    filter.AND = [{ programCategoryId: data.searchByCategory }];
  }

  return filter;
};

const create = async (data) =>
  await prisma.program.create({
    data,
    select: programSelect,
  });

const get = async (id) =>
  await prisma.program.findUnique({
    where: { id },
    select: programSelect,
  });

const updateProgramById = async (id, data) =>
  await prisma.program.update({
    where: { id },
    data,
    select: programSelect,
  });

const deleteProgrameById = async (id) =>
  await prisma.program.delete({
    where: { id },
    select: programSelect,
  });

const getAllProgram = async (data) => {
  const result = await prisma.program.findMany({
    where: data ? getSearchProgramFilter(data) : undefined, // Apply filter if search exists
    select: programSelect,
    skip: (data.page - 1) * data.size || 0,
    take: data.size || 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const totalItems = async (data) =>
  await prisma.program.count({
    where: data ? getSearchProgramFilter(data) : undefined, // Apply filter if search exists
  });

module.exports = {
  create,
  get,
  updateProgramById,
  deleteProgrameById,
  getAllProgram,
  totalItems,
};
