// middlewares/visitCounter.js
const prisma = require("./database");

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
  }
  next();
};

module.exports = visitCounterMiddleware;
