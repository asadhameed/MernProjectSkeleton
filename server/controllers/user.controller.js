import winston from "winston";
import userModel from "../models/user.model";
import _ from "lodash";

const { User } = userModel;

const userList = async (req, res) => {
  const user = await User.find().select("name email create update");
  res.send(user);
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
