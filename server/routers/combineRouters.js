import express from "express";

import userRouter from "./user.router";
import authRouter from "./auth.router";

const routersApp = express();

routersApp.use("/api/users", userRouter);
routersApp.use("/auth", authRouter);
export default routersApp;
