import express from 'express';
import { preSignup, signup, login } from '../controllers/auth.controller.js';
import upload from '../middleware/upload.js';

const authRouter = express.Router();

authRouter
    .post('/pre-signup', upload.single('img'), preSignup)
    .get('/signup/:token', signup)
    .post('/login', login)

export default authRouter;