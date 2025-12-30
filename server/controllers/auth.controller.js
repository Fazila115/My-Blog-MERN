import User from '../models/user.model.js';
import emailValidator from 'email-validator';
import passwordValidator from 'password-validator';
import emailTemplate from '../helper/emailTemplate.js';
import { generateEmailToken } from '../helper/generateToken.js';
import crypto from 'crypto';

var validator = new passwordValidator();
validator
    .is().min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().symbols()
    .has().not().spaces()

// 1. pre-signup controller
const preSignup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, bio, phone, dob, address } = req.body;
        const img = req.file?.path;

        if (!firstName || !lastName || !email || !password || !bio || !phone || !dob || !address) {
            return res.status(400).json({ ok: false, message: 'All fields are required!' });
        }
        if (!img) {
            return res.status(400).json({ ok: false, message: 'Image is required!' });
        }
        if (firstName.length < 3 || firstName.length > 20) {
            return res.status(400).json({ ok: false, message: 'First name must be between 3 and 20 characters long!' });
        }
        if (lastName.length < 3 || lastName.length > 20) {
            return res.status(400).json({ ok: false, message: 'Last name must be between 3 and 20 characters long!' })
        }
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ ok: false, message: 'This email is already registered!' });
        }
        if (!emailValidator.validate(email)) {
            return res.status(400).json({ ok: false, message: 'Invalid email format!' });
        }
        if (!validator.validate(password)) {
            return res.status(400).json({ ok: false, message: 'Password should be 8-20 characters long, should contain atleast 1 uppercase, 1 lowercase, 1 special character, 2 digits and has no space!' });
        }
        if (bio.length < 3 || bio.length > 200) {
            return res.status(400).json({ ok: false, message: 'Bio must be between 3 and 200 characters long!' });
        }
        if (address.length < 3 || address.length > 200) {
            return res.status(400).json({ ok: false, message: 'Address must be between 3 and 200 characters long!' });
        }
        if (new Date(dob) > new Date()) {
            return res.status(400).json({ ok: false, message: 'Date of birth cannot be in the future!' })
        }
        if (isNaN(Date.parse(dob))) {
            return res.status(400).json({ ok: false, message: 'Invalid date of birth!' });
        }
        const phoneRegex = /^03[0-9]{9}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ ok: false, message: 'Phone number must be 11 digits and start with 03!' })
        }

        const { token, hashedToken } = generateEmailToken();
        const emailExpiry = Date.now() + 60 * 60 * 1000;

        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password, 
            bio, 
            phone, 
            dob, 
            address, 
            img,
            emailVerifyToken: hashedToken,
            emailVerifyExpiry: emailExpiry,
        });

        await newUser.save();

        const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

        await emailTemplate({
            to: email,
            subject: 'Verify Your Account',
            html: `
        <h4>Hello ${firstName},</h4>
        <p>Thank you for signing up! Click below to verify your email:</p>
        <a href="${verifyUrl}">Verify Email</a>
        <p>This link expires in 1 hour.</p>
      `
        });

        res.status(200).json({ ok: true, message: 'Verification email sent. Please check your inbox!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message, message: 'Server Error' });
    }
};

// 2. signup controller - register new user
const signup = async (req, res) => {
    try {
        const { token } = req.params;
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            emailVerifyToken: hashedToken,
            emailVerifyExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ ok: false, message: "Invalid/Expired Token" });
        }

        user.isVerified = true;
        user.emailVerifyToken = undefined;
        user.emailVerifyExpiry = undefined;
        await user.save();

        return res.redirect(`${process.env.CLIENT_URL}/login`);
    }
    catch (error) {
        res.status(500).json({ error: error.message, message: 'Server Error' });
    }
};

// 3.login controller 
const login = async (req, res) => {
    try {

    }
    catch (error) {

    }
};

export { preSignup, signup, login };