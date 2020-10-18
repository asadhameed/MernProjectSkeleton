import Express from "express";

import userController from "../controllers/user.controller";
import getValidatorErrors from "../helpers/validatorErrorHandler";
import UserModel from "../models/user.model";

const {
  username,
  email,
  passwordForRegistration,
  passwordConfirmation,
} = UserModel.UserValidation;
const userRouter = Express.Router();

userRouter
  .use([
    username,
    email,
    passwordForRegistration,
    passwordConfirmation,
    getValidatorErrors,
  ])
  .route("/")
  .get(userController.userList)
  .post(userController.createUser);

export default userRouter;
