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

const router = Router();

router.post(
  "/create",
  protectedRoute,
  noteValidator,
  validateRequest,
  createNote
);
router.get("/getall", protectedRoute, getAllNotes);
router.get("/get/:id", protectedRoute, getNote);
router.put(
  "/update/:id",
  protectedRoute,
  noteValidator,
  validateRequest,
  updateNote
);
router.delete("/delete/:id", protectedRoute, deleteNote);

export default router;
