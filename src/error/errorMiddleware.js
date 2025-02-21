const logger = require("../utilities/logging");
const responseError = require("./responseError");

const errorMiddleware = (err, req, res, next) => {
  // logger.error(`${err.status}\n${err.message}\n${err.stack}`);
  logger.error(`${err.status}\n${err.message}`);
  if (err instanceof responseError) {
    // Custom application error handling
    return res.status(err.status).json({
      error: true,
      message: err.message,
      status: "error",
      statusCode: err.status,
      success: false,
    });
  }

  // Log unexpected errors for debugging
  // console.error("Unexpected Error:", err);

  // Internal server error handling
  return res.status(500).json({
    error: true,
    message: "Internal Server Error",
    status: "error",
    statusCode: 500,
    success: false,
  });
};

module.exports = errorMiddleware;
