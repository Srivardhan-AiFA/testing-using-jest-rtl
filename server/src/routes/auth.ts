import { Router, Request, Response } from "express";
import passport from "../config/passport";
import { generateToken } from "../utils/jwt.utils";

const router = Router();

// Step 1: login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: callback & JWT generation
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req: Request, res: Response) => {
    const user = req.user as any;
    const token = generateToken({
      id: user._id,
      username: user.username,
      role: user.role,
    });
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
    return;
  }
);

export default router;
