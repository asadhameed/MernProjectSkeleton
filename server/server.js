import mongoose from "mongoose";
import "express-async-errors";
import winston from "winston";

import app from "./express";
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
  console.log(`Connect the application on ${config.port}`)
);
export default server;
// important note ---> 18/10/2020  import and require
/********************
 * 1)If use export default server here then the test file should use import.
 *    if here use export default
 *  and test file use require('../server/server').default this will working
 *
 *
 */
