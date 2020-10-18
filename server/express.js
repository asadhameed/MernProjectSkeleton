import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

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
export default app;
