import mongoose from 'mongoose';
import { env } from '../config/environment';

export const connectToDatabase = async (): Promise<void> => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(env.mongoUri);
  console.log('✅ Connected to MongoDB');
};
