import express, { Request, Response } from "express";
import session from "express-session";
import { config } from "dotenv";
import passport from "./config/passport";
import authRoutes from "./routes/auth";
import noteRoutes from "./routes/notes.routes";
import modRoutes from "./routes/mod.routes";
import adminRoutes from "./routes/admin.routes";
import { connectDB } from "./config/db.config";
import cors from "cors";

config();

const app = express();
connectDB();

// Session middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Home Page");
});

app.use("/auth", authRoutes);
app.use("/mod", modRoutes);
app.use("/admin", adminRoutes);
app.use("/features", noteRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
