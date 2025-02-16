const service = require("./service");

// create
const create = async (req, res, next) => {
  try {
    const request = {
      content: req.body.content,
      description: req.body.description,
      image: req.body.image,
      title: req.body.title,
      userId: req.user.id,
      programCategoryId: req.body.programCategoryId,
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

// get by id
const getProgramById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.programId,
    };

    const response = await service.getProgramById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success get program by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// update
const updateProgramById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.programId,
      content: req.body.content,
      description: req.body.description,
      image: req.body.image,
      title: req.body.title,
      userId: req.user.id,
      programCategoryId: req.body.programCategoryId,
    };

    const response = await service.updateProgram(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success update program by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// remove
const deleteProgram = async (req, res, next) => {
  try {
    const request = {
      id: req.params.programId,
    };

    const response = await service.deleteProgram(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success delete program by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// get all
const getAllProgram = async (req, res, next) => {
  try {
    const request = {
      search: req.query.search,
      page: req.query.page,
      size: req.query.size,
      searchByCategory: req.query.searchByCategory,
    };

    const response = await service.getAllProgram(request);

    res.status(200).json({
      data: response.program,
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
  getProgramById,
  updateProgramById,
  deleteProgram,
  getAllProgram,
};
