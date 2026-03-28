import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware";
import { noteValidator } from "../validators/note.validators";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "../controllers/notes.controllers";
import { notesLimiter } from "../middlewares/rateLimit";

const router = Router();

router.post(
  "/create",
  notesLimiter,
  protectedRoute,
  noteValidator,
  validateRequest,
  createNote
);
router.get("/getall/:category", notesLimiter, protectedRoute, getAllNotes);
router.get("/get/:id", notesLimiter, protectedRoute, getNote);
router.put(
  "/update/:id",
  notesLimiter,
  protectedRoute,
  noteValidator,
  validateRequest,
  updateNote
);
router.delete("/delete/:id", notesLimiter, protectedRoute, deleteNote);

export default router;
