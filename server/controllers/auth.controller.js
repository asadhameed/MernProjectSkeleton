import winston from "winston";
import expressJwt from "express-jwt";
import userModel from "../models/user.model";
import config from "../../config";

const signin = async (req, res) => {
  winston.info(
    `FileName:auth.controller---> ${req.body.email} want to sign in`
  );
  const { email, password } = req.body;

  const user = await userModel.User.findOne({ email });
  if (!user || !user.authentication(password))
    return res.status(401).json({ error: "Email and password is invalid" });
  const token = await user.createToken();
  winston.info(`FileName:auth.controller--->  token create for ${email} `);
  res.cookie("t", token, { expire: new Date() + 9999 });
  res.json({
    token,
    name: user.name,
    email: user.email,
    _id: user._id,
  });
};

const signout = (req, res) => {
  res.clearCookie("t");
  res.status(200).json({
    message: "Sign out",
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(authorized);
  if (!authorized)
    return res.status(403).json({ error: "User is not authorized" });
  next();
};
export default { signin, signout, requireSignin, hasAuthorization };
