import express from 'express';
import { preSignup, signup, login, forgetPassword, resetPassword } from '../controllers/auth.controller.js';
import upload from '../middleware/upload.js';

const authRouter = express.Router();

authRouter
    .post('/pre-signup', upload.single('img'), preSignup)
    .get('/signup/:token', signup)
    .post('/login', login)
    .post('/forget-password', forgetPassword)
    .post('/reset-password/:token', resetPassword)

export default authRouter;