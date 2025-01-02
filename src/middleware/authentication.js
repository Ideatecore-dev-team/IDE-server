const jwt = require("jsonwebtoken");
const responseError = require("../error/responseError");

const authentication = (req, res, next) => {
  try {
    // Check if the `authorization` cookie exists
    const authorizationCookie = req.cookies?.authorization;
    if (!authorizationCookie) {
      throw new responseError(401, "unauthorized");
    }

    // Ensure the token has the correct Bearer format
    const bearer = authorizationCookie.split(" ")[0];
    if (bearer !== "Bearer") {
      throw new responseError(401, "unauthorized");
    }

    // Verify the token
    const token = req.cookies.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verifyToken;
    next();
  } catch (error) {
    // Handle specific JWT errors
    const errorMessage =
      error.name === "TokenExpiredError"
        ? "Token has expired"
        : error.name === "JsonWebTokenError"
        ? "invalid token"
        : "unauthorized";

    res.status(401).json({
      error: true,
      message: errorMessage,
      status: "error",
      statusCode: 401,
      success: false,
    });
  }
};

module.exports = authentication;
