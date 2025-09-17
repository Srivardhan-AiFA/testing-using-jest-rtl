import { body } from "express-validator";

export const signupValidator = [
  body("firstname").notEmpty().withMessage("firstname is required"),
  body("lastname").notEmpty().withMessage("lastname is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
];

export const signinValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
