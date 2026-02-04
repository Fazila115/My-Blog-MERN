import { findByEmail, findByEmailToken, findByResetToken, updatePassword, createUser, verifyEmail, setResetToken } from '../repository/authRepository.js';
import passwordValidator from 'password-validator';
import emailValidator from 'email-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { generateEmailToken } from '../helper/generateToken.js';
import emailTemplate from '../helper/emailTemplate.js';

var validator = new passwordValidator();
validator
    .is().min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().symbols()
    .has().not().spaces()

// 1. validating signup data 
export const validateSignupData = (data) => {
    const { firstName, lastName, email, password, bio, phone, dob, address, img } = data;
    if (!firstName || !lastName || !email || !password || !bio || !phone || !dob || !address || !img) {
        throw new Error('All fields are required!');
    }
    if (firstName.length < 3 || firstName.length > 20) throw new Error('First name must be 3-20 characters');
    if (lastName.length < 3 || lastName.length > 20) throw new Error('Last name must be 3-20 characters');
    if (!emailValidator.validate(email)) throw new Error('Invalid email format');
    if (!validator.validate(password)) throw new Error('Password must be 8-20 chars, 1 uppercase, 1 lowercase, 1 symbol, 2 digits, no spaces');
    if (bio.length < 3 || bio.length > 200) throw new Error('Bio must be 3-200 characters');
    if (address.length < 3 || address.length > 200) throw new Error('Address must be 3-200 characters');
    if (new Date(dob) > new Date() || isNaN(Date.parse(dob))) throw new Error('Invalid date of birth');
    const phoneRegex = /^03[0-9]{9}$/;
    if (!phoneRegex.test(phone)) throw new Error('Invalid phone number');
};

// 2. pre-signup service
export const preSignupService = async (userData) => {
    const { email, password, firstName } = userData;

    const existingUser = await findByEmail(email);
    if (existingUser) throw new Error('Email already registered');

    const { token, hashedToken } = generateEmailToken();
    const emailExpiry = Date.now() + 60 * 60 * 1000;

    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;
    userData.emailVerifyToken = hashedToken;
    userData.emailVerifyExpiry = emailExpiry;

    await createUser(userData);

    const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
    await emailTemplate({
        to: email,
        subject: 'Verify Your Account',
        html: `<h4>Hello ${firstName}</h4><p>Click below to verify:</p><a href="${verifyUrl}">Verify Email</a>`
    });

    return true;
};

// 3. signup service for email verfication 
export const signupService = async (token) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await findByEmailToken(hashedToken);
    if (!user) throw new Error('Invalid/Expired Token');

    await verifyEmail(user);
    return true;
};

// 4. login service
export const loginService = async (email, password) => {
    const user = await findByEmail(email);
    if (!user) throw new Error('Invalid email or password');
    if (!user.isVerified) throw new Error('Email not verified');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const safeUser = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        img: user.img,
        address: user.address,
        dob: user.dob,
        phone: user.phone
    };
    return { user: safeUser, token };
};

// 5. forget password service
export const forgetPasswordService = async (email) => {
    const user = await findByEmail(email);
    if (!user) throw new Error('Email not registered');

    const { token, hashedToken } = generateEmailToken();
    const expiry = Date.now() + 60 * 60 * 1000;
    await setResetToken(user, hashedToken, expiry);

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await emailTemplate({
        to: email,
        subject: 'Reset Your Password',
        html: `<p>Reset your password:</p><a href="${resetUrl}">Reset Password</a>`
    });

    return true;
};

// 6. reset password service
export const resetPasswordService = async (token, password) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await findByResetToken(hashedToken);
    if (!user) throw new Error('Invalid or expired token');

    const hashedPassword = await bcrypt.hash(password, 10);
    await updatePassword(user, hashedPassword);

    return true;
};