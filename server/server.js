import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});