import User from '../models/user.model.js';

// 1. find user by email
export const findByEmail = async (email) => {
    return await User.findOne({ email: email.toLowerCase() });
};

// 2. create  user 
export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

// 3. find by email token
export const findByEmailToken = async (hashedToken) => {
    return await User.findOne({
        emailVerifyToken: hashedToken,
        emailVerifyExpiry: { $gt: Date.now() },
    });
};

// 4. verify email of user
export const verifyEmail = async (user) => {
    user.isVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyExpiry = undefined;

    return await user.save();
};

// 5. reset password token of user
export const setResetToken = async (user, hashedToken, expiry) => {
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiry = expiry;

    return await user.save();
};

// 6. find by reset token
export const findByResetToken = async (hashedToken) => {
    return await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpiry: { $gt: Date.now() },
    });
};

// 7. update password
export const updatePassword = async (user, hashedPassword) => {
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    return await user.save();
};
