import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js';
import overviewRouter from './routes/dashboard.route.js';

// creating app & PORT variable
const app = express();
const PORT = process.env.PORT || 3000;

// connect database
dotenv.config();
connectDB();

// middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));

// routes
app.use('/api/auth',authRouter);
app.use('/api/post', postRouter);
app.use('/api/dashboard-overview', overviewRouter);

// listening server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
