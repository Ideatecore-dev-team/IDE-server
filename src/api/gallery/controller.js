const service = require("./service");
// create

const create = async (req, res, next) => {
  try {
    const request = {
      image: req.body.image,
    };

    const response = await service.create(request);

    res.status(201).json({
      data: response,
      error: false,
      message: "success create gallery",
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
    const response = await service.getAll();

    res.status(200).json({
      data: response,
      error: false,
      message: "success get all gallery",
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
      id: req.params.galleryId,
    };

    const response = await service.getById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success get gallery by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// update
const updateById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.galleryId,
      image: req.body.image,
    };

    const response = await service.updateById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success update gallery by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// remove

module.exports = { create, updateById, getAll, getById };
