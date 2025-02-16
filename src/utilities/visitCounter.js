// middlewares/visitCounter.js
const prisma = require("./database"); // Adjust the path if necessary

const visitCounterMiddleware = async (req, res, next) => {
  // Retrieve the IP address
  const ip =
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    "unknown";
  try {
    await prisma.visit.create({
      data: { ip },
    });
  } catch (error) {
    console.error("Error logging visit:", error);
    next(error);
  }

  next();
};

module.exports = visitCounterMiddleware;
