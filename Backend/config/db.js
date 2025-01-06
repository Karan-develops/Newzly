import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Unable to connect with database,Error:", error);
    process.exit(1);
  }
}
