import { Router } from "express";
import { getAllUsers } from "../controllers/features.controllers";
import { protectedRoute } from "../middlewares/auth.middleware";

const router = Router();

router.get("/getusers", protectedRoute, getAllUsers);

export default router;
