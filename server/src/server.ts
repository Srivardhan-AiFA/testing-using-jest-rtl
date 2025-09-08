import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// database
import { connectDB } from "./config/db.config";

// routes
import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/notes.routes";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/notes", noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
