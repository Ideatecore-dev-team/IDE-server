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
      message: "success create team category",
      status: "success",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTeamCategory = async (req, res, next) => {
  try {
    const response = await service.getAllTeamCategory();

    res.status(200).json({
      data: response,
      error: false,
      message: "success get all team category",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTeamCategoryById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.teamCategoryId,
    };

    const response = await service.getAllTeamCategoryById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success get team category by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const updateTeamCategory = async (req, res, next) => {
  try {
    const request = {
      id: req.params.teamCategoryId,
      name: req.body.name,
    };
    const response = await service.update(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success update team category",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTeamCategory = async (req, res, next) => {
  try {
    const request = {
      id: req.params.teamCategoryId,
    };

    const response = await service.deleteCategoryById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success delete team category",
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
  getAllTeamCategory,
  getAllTeamCategoryById,
  updateTeamCategory,
  deleteTeamCategory,
};
