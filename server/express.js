import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import winston from "winston";

import template from "../template";
import routersApp from "./routers/combineRouters";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

app.get("/", async (req, res) => {
  console.log("come here");
  res.send(template());
});
app.use("/", routersApp);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError")
    res.status(401).json({ error: err.name + ":" + err.message });
  else if (err) {
    res.status(400).json({ error: err.name + ":" + err.message });
    winston.exceptions(err);
  }
});
export default app;
