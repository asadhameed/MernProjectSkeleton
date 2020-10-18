import Express from "express";

import userController from "../controllers/user.controller";
import getValidatorErrors from "../helpers/validatorErrorHandler";
import UserModel from "../models/user.model";

const { username } = UserModel.UserValidation;
const userRouter = Express.Router();

userRouter
  .use([username, getValidatorErrors])
  .route("/users")
  .get(userController.userList)
  .post(userController.createUser);

export default userRouter;
