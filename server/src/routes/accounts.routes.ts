import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware";
import {
  addTransaction,
  getLastTransactions,
} from "../controllers/accounts.controllers";

const router = Router();

router.get(
  "/transactions/getPrevTransactions",
  protectedRoute,
  getLastTransactions
);
router.post("/transactions/addNewAccount", protectedRoute, addTransaction);

export default router;
