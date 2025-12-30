import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './routes/user.route.js'

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));

app.use('/api/auth',authRouter);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
