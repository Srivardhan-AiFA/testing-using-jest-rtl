import { Router } from "express";
import { signin, redirect } from "../middlewares/auth.middleware";
import { sendUserProfile } from "../controllers/auth.controllers";
import passport from "passport";

const router = Router();

router.get("/google", signin);
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/signin",
    // successRedirect: "http://localhost:5173/dashboard?connected=true",
  }),
  sendUserProfile
);

export default router;
