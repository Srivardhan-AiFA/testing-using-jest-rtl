import { body } from "express-validator";

export const noteValidator = [
  body("content").notEmpty().withMessage("content is required"),
];
