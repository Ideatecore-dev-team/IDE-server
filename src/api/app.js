const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
require("dotenv").config();

// error middleware
const responseError = require("../error/responseError");
const errorMiddleware = require("../error/errorMiddleware");

// utilities
const apiDelay = require("../utilities/apiDelay");
const rateLimit = require("../utilities/rateLimit");
// router
const userRoute = require("../api/user/route");

app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// limit request from one IP address per second

// delay
app.use(apiDelay);
app.use(rateLimit);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// router
app.use(userRoute);

app.use("*", (req, res, next) => {
  const endpoint = req.originalUrl;
  next(new responseError(404, `${endpoint} endpoint not found!`));
});

app.use(errorMiddleware);

module.exports = app;
