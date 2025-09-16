import { Router } from "express";
import { createEvent } from "../controllers/calendar.controllers";
import { protectedRoute } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = Router();
router.post("/create", protectedRoute, upload.single("file"), createEvent);

export default router;
