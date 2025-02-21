const service = require("./service");

// register
const register = async (req, res, next) => {
  try {
    const request = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const response = await service.register(request);

    res.status(201).json({
      data: response,
      error: false,
      message: "success register user",
      status: "success",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// get all user
const getAllUser = async (req, res, next) => {
  try {
    const request = {
      page: req.query.page,
      size: req.query.size,
    };

    const response = await service.getAllUser(request);

    res.status(200).json({
      data: response.user,
      pagination: {
        currentPage: response.currentPage,
        perPage: response.perPage,
        totalItems: response.totalItems,
        totalPage: response.totalPage,
      },
      error: false,
      message: "success get all user",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// get user by id
const getUserById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.userId,
    };

    const response = await service.getUserById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success get user by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// update user by id
const updateUserById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.userId,
      name: req.body.name,
    };

    const response = await service.updateUserById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success update user by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// update password by id
const updatePasswordById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.userId,
      password: req.body.password,
    };

    const response = await service.updatePasswordById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success update password by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// remove user by id
const remove = async (req, res, next) => {
  try {
    const request = {
      id: req.params.userId,
    };

    const response = await service.remove(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success remove user by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  getAllUser,
  getUserById,
  updateUserById,
  updatePasswordById,
  remove,
};
