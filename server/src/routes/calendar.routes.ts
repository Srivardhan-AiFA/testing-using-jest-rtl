import { Router } from "express";
import { addEvent } from "../controllers/calendar.controllers";

const router = Router();
router.post("/send", addEvent);

export default router;
