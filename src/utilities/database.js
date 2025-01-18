const { PrismaClient } = require("@prisma/client");
const logger = require("./logging");
require("dotenv").config();

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

// prismaClient.$on("query", (e) => {
//   logger.info(e.query);
//   logger.info(e.params);
//   logger.info(e.duration + "ms");
// });

// prismaClient.$on("error", (e) => {
//   logger.info(e);
// });

// prismaClient.$on("warn", (e) => {
//   logger.info(e);
// });

// prismaClient.$on("info", (e) => {
//   logger.info(e);
// });

module.exports = prismaClient;
