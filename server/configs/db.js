import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/UnrouteSocial`)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
    
}

export default connectDB