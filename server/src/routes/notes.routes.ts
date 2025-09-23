import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware";
import { noteValidator } from "../validators/note.validators";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { notesLimiter } from "../middlewares/rateLimit";
import { requireRole } from "../middlewares/role.middleware";
import { createNote, getNotes } from "../controllers/user.controllers";

const router = Router();

router.post(
  "/create",
  protectedRoute,
  notesLimiter,
  requireRole(["user", "admin", "moderator"]),
  createNote
);

router.get(
  "/getAllNotes",
  protectedRoute,
  notesLimiter,
  requireRole(["user", "admin", "moderator"]),
  getNotes
);

export default router;
