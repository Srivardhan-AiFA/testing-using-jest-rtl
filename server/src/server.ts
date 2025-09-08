import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// database
import { connectDB } from "./config/db.config";

// routes
import authRoutes from "./routes/auth.routes";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
