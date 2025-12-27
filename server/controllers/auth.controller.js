import User from '../models/user.model.js';
import emailValidator from 'email-validator';
import passwordValidator from 'password-validator';

var validator = new passwordValidator();
validator
    .is().min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().symbols()
    .has().not().spaces()

// 1. signup controller - register new user
const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, bio, phone, dob, address, img } = req.body;

        if (!firstName || !lastName || !email || !password || !bio || !phone || !dob || !address || !img) {
            return res.status(400).json({ ok: false, message: 'All fields are required!' });
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
        const imageRegex = /\.(jpg|jpeg|png|webp)$/i;
        if (!imageRegex.test(img)) {
            return res.status(400).json({ ok: false, message: 'Only jpg, jpeg, png, or webp images are allowed' })
        }

        const newUser = new User({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password,
            bio: bio.trim(),
            dob,
            address: address.trim(),
            img,
            phone
        });
        await newUser.save();

        res.status(201).json({ ok: true, message: 'User Registered sucessfully!', user: newUser });
    }
    catch (error) {
        res.status(500).json({ error: error.message, message: 'Server Error' });
    }
};

// 2.login controller 
const login = async (req, res) => {
    try {

    }
    catch (error) {

    }
};

export { signup, login };