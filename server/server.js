import dotenv from 'dotenv';
dotenv.config();

console.log("LOADED ENV:", process.env.MONGODB_URL);

import express from 'express';
import { serve } from 'inngest/express';    
import cors from 'cors';
import connectDB from '../server/configs/db.js';
import {inngest, functions} from '../server/inngest/index.js'; 
import { clerkMiddleware } from '@clerk/express'
import userRouter from '../server/routes/userRoutes.js';
import morgan from 'morgan';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(clerkMiddleware()); 
app.use(morgan("dev"))

//Routes
app.get('/', (req, res)=> res.send('Server is running'))
app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/user', userRouter)             // api endpoints path from routes folder

const PORT = process.env.PORT || 4000;


connectDB().then(()=>{
    app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
})

