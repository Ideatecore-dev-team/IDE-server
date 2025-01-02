const service = require("./service");

const create = async (req, res, next) => {
  try {
    const request = {
      category: req.body.category,
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

module.exports = { create };
