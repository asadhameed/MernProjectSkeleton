import winston from "winston";
import _ from "lodash";
import mongoose from "mongoose";

import userModel from "../models/user.model";

const { User } = userModel;

const userList = async (req, res) => {
  winston.info(`FileName:user.controller---> ${req.body} want to register`);
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

const userByID = async (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Id is invalid" });
  winston.info(
    `FileName:user.controller---> ${id} want to read data from database`
  );
  const user = await User.findById(id);
  if (!user) return res.status(401).json({ error: "User is not found" });
  req.profile = _.pick(user, ["name", "email", "_id", "create", "update"]);
  winston.info(
    `FileName:user.controller---> ${req.profile._id} send to the user successful`
  );
  next();
};
const read = (req, res) => {
  return res.json(req.profile);
};
const update = async (req, res) => {
  winston.info(
    `FileName:user.controller---> ${req.profile._id} want to update`
  );
  const user = req.body;
  user.update = Date.now();
  const updatedUser = await User.findByIdAndUpdate(req.profile._id, user, {
    new: true,
  });
  winston.info(
    `FileName:user.controller---> ${req.profile._id} update  successful`
  );
  res.json(_.pick(updatedUser, ["name", "email", "_id", "create", "update"]));
};
const remove = async (req, res) => {
  winston.info(
    `FileName:user.controller---> ${req.profile._id} want to delete profile`
  );
  const deleteUser = await User.findByIdAndDelete(req.profile._id);
  winston.info(
    `FileName:user.controller---> ${req.profile._id} deleted successful`
  );
  res.json(_.pick(deleteUser, ["name", "email", "_id", "create"]));
};
export default { userList, createUser, userByID, read, update, remove };
