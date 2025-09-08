import { body } from "express-validator";

export const noteValidator = [
  body("title").notEmpty().withMessage("title is required"),
  body("content").notEmpty().withMessage("content is required"),
];
