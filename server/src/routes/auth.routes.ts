import { Router } from "express";
import { signin } from "../middlewares/auth.middleware";
import { sendUserProfile } from "../controllers/auth.controllers";
import passport from "passport";

const router = Router();

router.get("/google", signin);
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/signin",
  }),
  sendUserProfile
);

export default router;
