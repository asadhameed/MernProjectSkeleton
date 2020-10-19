import express from "express";

import authController from "../controllers/auth.controller";
import UserModel from "../models/user.model";
import getValidatorErrors from "../helpers/validatorErrorHandler";
const { requiredEmail, requiredPassword } = UserModel.UserValidation;

const authRouter = express.Router();
authRouter.post(
  "/signin",
  [requiredEmail, requiredPassword, getValidatorErrors],
  authController.signin
);
authRouter.get("/signout", authController.signout);

export default authRouter;
