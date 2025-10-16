import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/casino";
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
