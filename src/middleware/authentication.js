const jwt = require("jsonwebtoken");
const responseError = require("../error/responseError");
const prisma = require("../utilities/database");

const authentication = async (req, res, next) => {
  try {
    // Check if the `authorization` cookie exists
    const authorizationCookie = req.cookies?.authorization;
    if (!authorizationCookie) {
      throw new responseError(401, "unauthenticated");
    }

    // Ensure the token has the correct Bearer format
    const bearer = authorizationCookie.split(" ")[0];
    if (bearer !== "Bearer") {
      throw new responseError(401, "unauthenticated");
    }

    // Verify the token
    const token = req.cookies.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: {
        id: verifyToken.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new responseError(401, "unauthenticated");
    }

    req.user = user;
    next();
  } catch (error) {
    // Handle specific JWT errors
    const errorMessage =
      error.name === "TokenExpiredError"
        ? "Token has expired"
        : error.name === "JsonWebTokenError"
        ? "invalid token"
        : "unauthenticated";

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
