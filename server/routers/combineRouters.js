import express from "express";

import userRouter from "./user.router";

const routersApp = express();

routersApp.use("/api", userRouter);
export default routersApp;
