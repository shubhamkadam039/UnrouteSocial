import express from 'express';
// import { serve } from 'inngest/express';    
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './configs/db.js';
// import {inngest, functions} from './inngest/index.js'; 
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res)=> res.send('Server is running'))
// app.use('/api/inngest', serve({ client: inngest, functions }));

const PORT = process.env.PORT || 4000;


connectDB().then(()=>{
    app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
})