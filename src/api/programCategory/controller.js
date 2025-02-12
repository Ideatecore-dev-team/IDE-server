const service = require("./service");

const create = async (req, res, next) => {
  try {
    const request = {
      name: req.body.name,
    };

    const response = await service.create(request);

    res.status(201).json({
      data: response,
      error: false,
      message: "success create category",
      status: "success",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const response = await service.getAllCategory();

    res.status(200).json({
      data: response,
      error: false,
      message: "success get all category",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.categoryId,
    };

    const response = await service.getCategoryById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success get category by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const request = {
      id: req.params.categoryId,
      name: req.body.name,
    };

    const response = await service.updateCategoryById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success update category",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const request = {
      id: req.params.categoryId,
    };

    const response = await service.deleteCategoryById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success delete category",
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
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
