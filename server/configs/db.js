import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    throw error;    // let the caller handle it
    }
    
};

export default connectDB