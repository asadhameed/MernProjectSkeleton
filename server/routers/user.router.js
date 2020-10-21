import Express from "express";

import userController from "../controllers/user.controller";
import getValidatorErrors from "../helpers/validatorErrorHandler";
import UserModel from "../models/user.model";
import authController from "../controllers/auth.controller";
const { requireSignin, hasAuthorization } = authController;

const {
  username,
  email,
  passwordForRegistration,
  passwordConfirmation,
} = UserModel.UserValidation;
const userRouter = Express.Router();

userRouter
  .route("/")
  .get(userController.userList)
  .post(
    [
      username,
      email,
      passwordForRegistration,
      passwordConfirmation,
      getValidatorErrors,
    ],
    userController.createUser
  );

userRouter
  .param("userID", userController.userByID)
  .route("/:userID")
  .get(requireSignin, userController.read)
  .put([requireSignin, hasAuthorization], userController.update)
  .delete(requireSignin, hasAuthorization, userController.remove);
//userRouter.param("userID", userController.userByID);

export default userRouter;
