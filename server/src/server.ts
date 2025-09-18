import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// database
import { connectDB } from "./config/db.config";

// routes
import authRoutes from "./routes/auth.routes";
import accountRoutes from "./routes/accounts.routes";
import servicesRoutes from "./routes/services.routes";

// rate limiters
import { globalLimiter } from "./middlewares/rateLimit";

dotenv.config();
connectDB();

export const app = express();

app.use(globalLimiter);
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/accounts", accountRoutes);
app.use("/services", servicesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
