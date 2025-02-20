const rateLimit = require("express-rate-limit");
const responseError = require("../error/responseError");

// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  message:
    "Too many requests from this IP, please try again after a 10 minute wait",
  headers: true, // Add `Retry-After` header
  handler: (req, res, next) => {
    next(
      new responseError(
        429,
        "Too many requests from this IP, please try again after a 10 minute wait",
      ),
    );
  },
});

module.exports = limiter;
