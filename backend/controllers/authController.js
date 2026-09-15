const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const inMemoryUsers = global._inMemoryUsers || (global._inMemoryUsers = []);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'leafcare_secret_fallback_key', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

const sendToken = (user, code, res) => {
  const token = typeof user.getToken === 'function' ? user.getToken() : generateToken(user._id);
  res.status(code).json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email }
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // If MongoDB is connected, use Mongoose
    if (mongoose.connection.readyState === 1) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ success: false, message: 'Email already registered' });
      const user = await User.create({ name, email, password });
      return sendToken(user, 201, res);
    }

    // In-memory fallback (when Mongo is not connected)
    const exists = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return res.status(400).json({ success: false, message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      _id: 'user_' + Date.now(),
      name,
      email,
      password: hashedPassword,
    };
    inMemoryUsers.push(newUser);
    return sendToken(newUser, 201, res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Please provide email and password' });

    // If MongoDB is connected, use Mongoose
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email }).select('+password');
      if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
      const match = await user.matchPassword(password);
      if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });
      return sendToken(user, 200, res);
    }

    // In-memory fallback
    const user = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    return sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMe = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const user = await User.findById(req.user.id);
    return res.status(200).json({ success: true, data: user });
  }
  const user = inMemoryUsers.find(u => u._id === req.user.id) || req.user;
  res.status(200).json({ success: true, data: user });
};
