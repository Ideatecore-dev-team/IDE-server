const service = require("./service");

const create = async (req, res, next) => {
  try {
    const request = {
      content: req.body.content,
      description: req.body.description,
      image: req.body.image,
      title: req.body.title,
      userId: req.user.id,
      categoryId: req.body.categoryId,
    };

    const response = await service.create(request);

    res.status(201).json({
      data: response,
      error: false,
      message: "success create article",
      status: "success",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.articleId,
    };

    const response = await service.getArticleById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success get article by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const updateArticleById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.articleId,
      content: req.body.content,
      description: req.body.description,
      image: req.body.image,
      title: req.body.title,
      userId: req.user.id,
      categoryId: req.body.categoryId,
    };

    const response = await service.updateArticleById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success update article by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const deleteArticleById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.articleId,
    };

    const response = await service.deleteArticleById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success delete article by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getAllArticle = async (req, res, next) => {
  try {
    const request = {
      search: req.query.search,
      page: req.query.page,
      size: req.query.size,
      searchByCategory: req.query.searchByCategory,
    };

    const response = await service.getAllArticle(request);

    res.status(200).json({
      data: response.article,
      pagination: {
        currentPage: response.currentPage,
        perPage: response.perPage,
        totalItems: response.totalItems,
        totalPage: response.totalPage,
      },
      error: false,
      message: "success get all article",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  getAllArticle,
};
