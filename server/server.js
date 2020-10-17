import mongoose from "mongoose";
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
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => winston.info(`Connect with ${process.env.MONGODB_URI}`))
  .catch((err) => winston.error(err));
const server = app.listen(config.port, () =>
  winston.info(`Connect the application on ${config.port}`)
);
export default server;
