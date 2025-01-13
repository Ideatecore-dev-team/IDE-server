const prisma = require("../../src/utilities/database");

const getUser = async () => {
  return await prisma.user.findFirst({});
};

const getCategory = async () => {
  return await prisma.category.findFirst({});
};

const articleData = {
  content: "testContent",
  description: "testDescription",
  image: "https://example.com/image.jpg",
  title: "testTitle",
};

const createTestArticle = async () => {
  const user = await getUser();
  const category = await getCategory();

  const article = await prisma.article.create({
    data: {
      content: articleData.content,
      description: articleData.description,
      image: articleData.image,
      title: articleData.title,
      userId: user.id,
      categoryId: category.id,
    },
  });

  return article;
};

const createManyTestArticle = async () => {
  const user = await getUser();
  const category = await getCategory();

  for (let i = 0; i < 15; i++) {
    await prisma.article.create({
      data: {
        content: `testContent${i}`,
        description: `testDescription${i}`,
        image: `https://example.com/image.jpg${i}`,
        title: `testTitle${i}`,
        userId: user.id,
        categoryId: category.id,
      },
    });
  }
};

const getArticle = async () => {
  const article = await prisma.article.findFirst({});
  return article;
};

const deleteTestArticle = async () => {
  await prisma.article.deleteMany({});
};

module.exports = {
  articleData,
  createTestArticle,
  deleteTestArticle,
  getArticle,
  createManyTestArticle,
};
