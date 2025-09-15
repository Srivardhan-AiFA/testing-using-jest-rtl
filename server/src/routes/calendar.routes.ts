import { Router } from "express";
import { createEvent } from "../controllers/calendar.controllers";
import { protectedRoute } from "../middlewares/auth.middleware";

const router = Router();
router.post("/create", protectedRoute, createEvent);

export default router;
