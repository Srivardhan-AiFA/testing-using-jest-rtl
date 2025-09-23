import { Router } from "express";

import { protectedRoute } from "../middlewares/auth.middleware";
import { getUsers, promoteUser } from "../controllers/mod.controllers";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/users/getAllUsers",
  protectedRoute,
  requireRole("moderator"),
  getUsers
);

router.put(
  "/users/promoteUser",
  protectedRoute,
  requireRole("moderator"),
  promoteUser
);
export default router;
