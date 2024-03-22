import User from '../models/User.js';
import { hash, compare } from 'bcrypt';
export const getAllUsers = async (req, res, next) => {
    try {
        //get all users from db:
        const users = await User.find();
        return res.status(200).json({ message: 'OK', users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'ERROR', cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        //signing up the user:
        const { name, email, password } = req.body;
        //check if already registered:
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send('User already registered!');
        //encrypt the password for safety purposes:
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        //save and return:
        await user.save();
        return res.status(201).json({ message: 'OK', id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'ERROR', cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        //logging in the user:
        const { email, password } = req.body;
        //check if not registered already:
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('User not registered!');
        }
        //check if password matches with encrypted pswd:
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send('Incorrect Password!');
        }
        return res.status(200).json({ message: 'OK', id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'ERROR', cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map