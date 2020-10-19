import winston from "winston";
import userModel from "../models/user.model";

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
export default { signin, signout };
