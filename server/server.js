import mongoose from "mongoose";
import app from "./express";
import "express-async-errors";
import winston from "winston";
import config from "../config";

mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`Connect with ${config.mongoUri}`))
  .catch((err) =>
    console.log(` Unable to connect with ${config.mongoUri} and error `, err)
  );
app.listen(config.port, function onStart(err) {
  if (err) console.log(err);
  console.info("Server start on port %s", config.port);
});
