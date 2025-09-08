import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware";
import { noteValidator } from "../validators/note.validators";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { createNote } from "../controllers/notes.controllers";

const router = Router();

router.post(
  "/create",
  noteValidator,
  validateRequest,
  protectedRoute,
  createNote
);
// router.get("/getall", protectedRoute);
// router.get("/get/:id", protectedRoute);
// router.put("/update/:id", protectedRoute);
// router.delete("/delete/:id", protectedRoute);

export default router;
