const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const transportsConsole = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ level: true }),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf((info) => {
      return `${info.timestamp}\n${info.level} => ${info.message}\n`;
    }),
  ),
});

const transportsFile = new DailyRotateFile({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf((info) => {
      return `${info.timestamp}\n${info.level} => ${info.message}\n`;
    }),
  ),
  filename: "./logs/%DATE%-logger.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "1kb",
  maxFiles: "1h",
});

const logger = winston.createLogger({
  level: "info",
  levels: winston.config.npm.levels,
  transports: [transportsConsole, transportsFile],
});

module.exports = logger;
