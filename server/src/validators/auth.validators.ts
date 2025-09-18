import { body } from "express-validator";

export const signupValidator = [
  body("username").notEmpty().withMessage("username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
];

export const signinValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
