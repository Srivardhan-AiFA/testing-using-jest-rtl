import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    const con = await mongoose.connect(MONGO_URI as string);
    console.log(`database connected ${con.connection.host}`);
  } catch (error) {
    console.error("database connection failed");
  }
};
