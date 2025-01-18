const responseError = require("../error/responseError");

const authorization = async (req, res, next) => {
  try {
    if (req.user.role !== "SUPER_ADMIN") {
      throw new responseError(401, "unauthorized");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
