import Express from "express";
import userController from "../controllers/user.controller";

const userRouter = Express.Router();
userRouter
  .route("/users")
  .get(userController.userList)
  .post(userController.createUser);

export default userRouter;
