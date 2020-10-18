import mongoose from "mongoose";
import crypto from "crypto";
import expressValidator, { check } from "express-validator";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 20,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required",
    unique: "Email is already exist",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  create: { type: Date, default: Date.now },
  update: Date,
  hash_password: {
    type: String,
    trim: true,
    required: "Password is required",
  },
  salt: String,
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hash_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authentication: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hash_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

UserSchema.path("hash_password").validate(function (v) {
  if (this._password && this._password.length < 6)
    this.invalidate("password", "Password must be 6 characters");

  if (this.isNew && !this._password)
    this.invalidate("Password", "Password is required");
}, null);

const User = mongoose.model("User", UserSchema);

const UserValidation = {
  username: check("name")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Name should 3 to 20 characters"),
  email: check("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is invalid")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("User already exist");
      return true;
    }),
  passwordForRegistration: check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should not less then 6 characters"),
  passwordConfirmation: check("passwordConfirmation").custom(
    (value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password confirmation does not match password");
      return true;
    }
  ),
};

export default { User, UserValidation };
