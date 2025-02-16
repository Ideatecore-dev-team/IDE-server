const prisma = require("../../utilities/database");

const articleSelect = {
  id: true,
  content: true,
  description: true,
  image: true,
  title: true,
  userId: true,
  categoryId: true,
  createdAt: true,
  updatedAt: true,
  User: {
    select: {
      name: true,
    },
  },
  Category: {
    select: {
      category: true,
    },
  },
};

const getSearchArticleFilter = (data) => {
  const filter = {
    OR: ["title", "description"].map((field) => ({
      [field]: { contains: data.search, mode: "insensitive" },
    })),
  };

  // Filter by category if provided
  if (data.searchByCategory) {
    filter.AND = [{ categoryId: data.searchByCategory }];
  }

  return filter;
};

const create = async (data) =>
  await prisma.article.create({
    data,
    select: articleSelect,
  });

const get = async (id) =>
  await prisma.article.findUnique({
    where: { id },
    select: articleSelect,
  });

const updateArticleById = async (id, data) =>
  await prisma.article.update({
    where: { id },
    data,
    select: articleSelect,
  });

const deleteArticleById = async (id) =>
  await prisma.article.delete({
    where: { id },
    select: articleSelect,
  });

const getAllArticle = async (data) => {
  const result = await prisma.article.findMany({
    where: data ? getSearchArticleFilter(data) : undefined, // Apply filter if search exists
    select: articleSelect,
    skip: (data.page - 1) * data.size || 0,
    take: data.size || 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const totalItems = async (data) =>
  await prisma.article.count({
    where: data ? getSearchArticleFilter(data) : undefined, // Apply filter if search exists
  });

module.exports = {
  create,
  get,
  updateArticleById,
  deleteArticleById,
  getAllArticle,
  totalItems,
};
