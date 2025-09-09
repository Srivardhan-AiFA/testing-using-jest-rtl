import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// database
import { connectDB } from "./config/db.config";

// routes
import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/notes.routes";
import servicesRoutes from "./routes/services.routes";

// rate limiters
import { globalLimiter } from "./middlewares/rateLimit";

dotenv.config();
connectDB();

const app = express();

app.use(globalLimiter);
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/services", servicesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
