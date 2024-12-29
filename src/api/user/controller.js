const service = require("./service");

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

module.exports = { register };
