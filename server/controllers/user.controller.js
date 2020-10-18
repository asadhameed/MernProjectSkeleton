import winston from "winston";
import userModel from "../models/user.model";
import _ from "lodash";

const { User } = userModel;

const userList = (req, res) => {
  res.send("i change the method");
};

const createUser = async (req, res) => {
  winston.info(
    `FileName:user.controller---> ${req.body.email} want to register`
  );
  const { name, email, password } = req.body;
  const user = await new User({
    name,
    email,
    password,
  });
  await user.save();
  winston.info(
    `FileName:user.controller---> ${user.email} is register successful in db`
  );
  res.send(_.pick(user, ["name", "email"]));
};

export default { userList, createUser };
