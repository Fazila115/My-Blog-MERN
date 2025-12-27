import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    firstName: { type: String, required: true, minLength: 3, maxLength: 20 },
    lastName: { type: String, required: true, minLength: 3, maxLength: 20 },
    email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] },
    password: { type: String, required: true },
    bio: { type: String, minLength: 3, maxLength: 200 },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true, minLength: 3, maxLength: 200 },
    img: { type: String, default: 'default-profile.png' }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = model('user', userSchema);
export default User;
