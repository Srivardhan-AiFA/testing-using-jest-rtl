import { Router } from "express";
import { signin, signup } from "../controllers/auth.controllers";
import {
  signinValidator,
  signupValidator,
} from "../validators/auth.validators";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { authLimiter } from "../middlewares/rateLimit";

const router = Router();

router.post("/signup", authLimiter, signupValidator, validateRequest, signup);
router.post("/signin", authLimiter, signinValidator, validateRequest, signin);

export default router;
