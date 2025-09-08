import { Router } from "express";
import { signin, signup } from "../controllers/auth.controllers";
import {
  signinValidator,
  signupValidator,
} from "../validators/auth.validators";
import { validateRequest } from "../middlewares/validateRequest.middleware";

const router = Router();

router.post("/signup", signupValidator, validateRequest, signup);
router.post("/signin", signinValidator, validateRequest, signin);

export default router;
