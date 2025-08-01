import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register Controller - This API has been checked
export const register = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // Early exit if user with that email already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    // Hashing of Password
    const saltround=parseInt(process.env.BCRYPT_ROUNDS) || 10
    const salt = await bcrypt.genSalt(saltround);
    const hashed =await  bcrypt.hash(password, salt);
    
    
    const user = new User({fullname, email, password_hash: hashed});
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
    const updateduser={
      user,
      token
    }
    res.status(201).json(updateduser,{ message: 'User registered successfully' });
  } catch (err) {
    console.log('ERROR :: WHILE REGISTERING USER', err)
    res.status(500).json({ message: 'User Registor Error' });
  }
};

// Login Controller - This API has been checked
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    // Early Exit if email not present in DB
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // matching of hashed password with user password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generating token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.json({ token });
  } catch (err) {
    console.log('ERROR :: WHILE USER LOGIN ', err.message);
    res.status(500).json({ message: 'User Login Error' });
  }
};
