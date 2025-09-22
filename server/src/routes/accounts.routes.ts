import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware";
import {
  addTransaction,
  getLastTransactions,
  initialData,
} from "../controllers/accounts.controllers";

const router = Router();

router.get(
  "/transactions/getPrevTransactions",
  protectedRoute,
  getLastTransactions
);
router.post("/transactions/addNewAccount", protectedRoute, addTransaction);
router.get("/getInitialData", protectedRoute, initialData);

export default router;
