const log4js = require("log4js");

// LOGGER CFG

log4js.configure({
  appenders: {
    loggerConsola: { type: "console" },
    loggerFile: { type: "file", filename: "warn.log" },
    loggerFile2: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["loggerConsola"], level: "trace" },
    archivo: { appenders: ["loggerFile"], level: "warn" },
    archivo2: { appenders: ["loggerFile2"], level: "error" },
  },
});

const loggerConsole = log4js.getLogger();

module.exports = loggerConsole;
