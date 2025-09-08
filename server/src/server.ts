import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// database
import { connectDB } from "./config/db.config";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
