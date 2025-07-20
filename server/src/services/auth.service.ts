import bcrypt from 'bcryptjs';
import User from '../models/User';
import { generateToken } from '../utils/token';

export const register = async (name: string, username: string, password: string) => {
    const existingUser = await User.findOne({ username });
    if(existingUser) throw new Error('Username already exists.');

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        name,
        username,
        password: hashedPassword
    });

    await user.save();

    return {
        user: user.toJSON(),
        token: generateToken(user._id.toString())
    };
};

export const login = async (username: string, password: string) => {
    const user = await User.findOne({ username });
    if(!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Invalid credentials');

    return {
        user: user.toJSON(),
        token: generateToken(user._id.toString())
    };
}
