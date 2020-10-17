import mongoose from "mongoose";
import "express-async-errors";
import app from "./express";
import winston from "winston";
import config from "../config";

winston.exceptions.handle(
  new winston.transports.Console({ colorize: true, prettyPrint: true }),
  new winston.transports.File({ filename: "exceptions.log" })
);

process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(new winston.transports.File({ filename: "logs.log" }));

mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => winston.info(`Connect with ${config.mongoUri}`))
  .catch((err) => winston.error(err));
const server = app.listen(config.port, () =>
  winston.info(`Connect the application on ${config.port}`)
);

module.exports = server; // important note ---> 18/10/2020  import and require
/********************
 * 1)If use export default server here then the test file should use import.
 *    if here use export and test file use require then test will file
 * 2) If s use module.exports = server then the test file should use require.
 *
 */
