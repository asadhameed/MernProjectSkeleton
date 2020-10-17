import mongoose from "mongoose";
import app from "./express";
import "express-async-errors";
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
  .then(() => console.log(`Connect with ${config.mongoUri}`));
app.listen(config.port, function onStart(err) {
  if (err) console.log(err);
  console.info("Server start on port %s", config.port);
});
