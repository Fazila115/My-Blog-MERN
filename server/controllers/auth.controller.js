import * as authService from '../services/auth.service.js';

//1. Pre-signup
export const preSignup = async (req, res) => {
    try {
        authService.validateSignupData({ ...req.body, img: req.file?.path });
        await authService.preSignupService({ ...req.body, img: req.file?.path });
        res.status(200).json({ ok: true, message: 'Verification email sent' });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

//2. Signup 
export const signup = async (req, res) => {
    try {
        await authService.signupService(req.params.token);
        res.redirect(`${process.env.CLIENT_URL}/login`);
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

//3. Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginService(email, password);
        res.status(200).json({ ok: true, message: 'Logged in', user, token });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

//4. Forget password
export const forgetPassword = async (req, res) => {
    try {
        await authService.forgetPasswordService(req.body.email);
        res.status(200).json({ ok: true, message: 'Password reset email sent' });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

//5. Reset password
export const resetPassword = async (req, res) => {
    try {
        await authService.resetPasswordService(req.params.token, req.body.password);
        res.status(200).json({ ok: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};