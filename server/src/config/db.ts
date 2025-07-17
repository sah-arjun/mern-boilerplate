import mongoose from 'mongoose';
import { MONGODB_URI } from "./env";

export const connectDB = async (): Promise<void> => {
  try {
    const uri = MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', (error as Error).message);
    process.exit(1); // Exit the app if DB connection fails
  }
};
