import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

// database
import { connectDB } from "./config/db.config";

// routes
import authRoutes from "./routes/auth.routes";
import calendarEventsRoutes from "./routes/calendar.routes";

// rate limiters
import { globalLimiter } from "./middlewares/rateLimit";
import passport from "./utils/passport";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

export const app = express();

app.use(globalLimiter);
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_, res) => res.send("Hello"));
app.use("/auth", authRoutes);
app.use("/calendar", calendarEventsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER STARTED on port ${PORT}`);
});
