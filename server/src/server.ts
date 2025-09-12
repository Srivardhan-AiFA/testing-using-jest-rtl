import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// database
import { connectDB } from "./config/db.config";

// routes
import authRoutes from "./routes/auth.routes";
import calendarEventsRoutes from "./routes/calendar.routes";

// rate limiters
import { globalLimiter } from "./middlewares/rateLimit";

dotenv.config();
connectDB();

export const app = express();

app.use(globalLimiter);
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("Hello"));
app.use("/auth", authRoutes);
app.use("/calendar", calendarEventsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
