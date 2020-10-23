import { validationResult } from "express-validator";
const getValidatorErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors });
  next();
};
export default getValidatorErrors;
