const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
require("dotenv").config();

// error middleware
const responseError = require("../error/responseError");
const errorMiddleware = require("../error/errorMiddleware");

// utilities
const apiDelay = require("../utilities/apiDelay");
const rateLimit = require("../utilities/rateLimit");
// router
const authRoute = require("../api/auth/route");
const userRoute = require("../api/user/route");
const categoryRoute = require("../api/category/route");
const articleRoute = require("../api/article/route");
const teamCategoryRoute = require("../api/teamCategory/route");
const teamRoute = require("../api/team/route");
const partnerRoute = require("../api/partner/route");
const companyInfoRoute = require("../api/companyInfo/route");
const subscribeRoute = require("../api/subscribe/route");
const contactUsRoute = require("../api/contactUs/route");
const mediaRoute = require("../api/media/route");

app.use("/media", express.static(path.join(__dirname, "../../media")));

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173", // Frontend 1
  // "http://localhost:5174", // Frontend 2 (Example)
  // "https://your-frontend-app.com", // Production frontend (Example)
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // Check for allowed origin
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies, etc.)
  }),
);

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
app.use(authRoute);
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/article", articleRoute);
app.use("/teamcategory", teamCategoryRoute);
app.use("/team", teamRoute);
app.use("/partner", partnerRoute);
app.use("/companyinfo", companyInfoRoute);
app.use("/subscribe", subscribeRoute);
app.use("/contactus", contactUsRoute);
app.use("/media", mediaRoute);

app.use("*", (req, res, next) => {
  const endpoint = req.originalUrl;
  next(new responseError(404, `${endpoint} url not found!`));
});

app.use(errorMiddleware);

module.exports = app;
