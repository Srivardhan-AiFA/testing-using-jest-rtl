import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// database
import { connectDB } from "./config/db.config";

// routes
import authRoutes from "./routes/auth.routes";
import modRoutes from "./routes/mod.routes";
import featureRoutes from "./routes/notes.routes";

// rate limiters
import { globalLimiter } from "./middlewares/rateLimit";

dotenv.config();
connectDB();

export const app = express();

app.use(globalLimiter);
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/mod", modRoutes);
app.use("/features", featureRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
