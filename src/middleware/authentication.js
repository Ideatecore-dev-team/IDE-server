const jwt = require("jsonwebtoken");
const responseError = require("../error/responseError");
const prisma = require("../utilities/database");

const authentication = async (req, res, next) => {
  try {
    // Prioritize token from Authorization header, fallback to authorization cookie
    let token = null;
    const authorizationHeader = req.headers?.authorization;
    const authorizationCookie = req.cookies?.authorization;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      token = authorizationHeader.split(" ")[1];
    } else if (
      authorizationCookie &&
      authorizationCookie.startsWith("Bearer ")
    ) {
      token = authorizationCookie.split(" ")[1];
    }

    if (!token) {
      throw new responseError(401, "unauthenticated");
    }

    // Verify the token
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
      status: "errorToken",
      statusCode: 401,
      success: false,
    });
  }
};

module.exports = authentication;
