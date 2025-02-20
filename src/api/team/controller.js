const service = require("./service");

const create = async (req, res, next) => {
  try {
    const request = {
      name: req.body.name,
      position: req.body.position,
      image: req.body.image,
      link: req.body.link,
      categoryTeamId: req.body.categoryTeamId,
    };

    const response = await service.create(request);

    res.status(201).json({
      data: response,
      error: false,
      message: "success create a team",
      status: "success",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
// get all
const getAll = async (req, res, next) => {
  try {
    const request = {
      page: req.query.page,
      size: req.query.size,
    };

    const response = await service.getAll(request);

    res.status(200).json({
      data: response.team,
      pagination: {
        currentPage: response.currentPage,
        perPage: response.perPage,
        totalItems: response.totalItems,
        totalPage: response.totalPage,
      },
      error: false,
      message: "success get all team",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
// get by id
const getById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.teamId,
    };

    const response = await service.getById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success get team by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
// update
const update = async (req, res, next) => {
  try {
    const request = {
      id: req.params.teamId,
      name: req.body.name,
      position: req.body.position,
      image: req.body.image,
      link: req.body.link,
      categoryTeamId: req.body.categoryTeamId,
    };

    const response = await service.update(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success update team",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
// remove
const remove = async (req, res, next) => {
  try {
    const request = {
      id: req.params.teamId,
    };

    const response = await service.remove(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success remove team",
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
  getAll,
  getById,
  update,
  remove,
};
