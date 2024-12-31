const responseError = require("./responseError");

const errorMiddleware = async (err, req, res, next) => {
  try {
    if (!err) {
      next();
      return;
    }
    if (err instanceof responseError) {
      // console.log("===>", err, "<===");
      res
        .status(err.status)
        .json({
          error: true,
          message: err.message,
          status: "error",
          statusCode: err.status,
          success: false,
        })
        .end();
    } else {
      console.log("===>", err, "<===");
      res
        .status(500)
        .json({
          error: true,
          message: "internal server error",
          status: "error",
          statusCode: 500,
          success: false,
        })
        .end();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = errorMiddleware;
