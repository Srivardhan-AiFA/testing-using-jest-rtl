import { Router } from "express";
import {
  addToCategoryController,
  addToFavoritesControllers,
} from "../controllers/features.controllers";
import { protectedRoute } from "../middlewares/auth.middleware";
import { notesLimiter } from "../middlewares/rateLimit";

const router = Router();

router.put(
  "/addtofav/:id",
  notesLimiter,
  protectedRoute,
  addToFavoritesControllers
);

router.put(
  "/addtocategory/:id",
  notesLimiter,
  protectedRoute,
  addToCategoryController
);
export default router;
