const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ success: false, message: 'Not authorised - no token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'leafcare_secret_fallback_key');
    if (mongoose.connection.readyState === 1) {
      req.user = await User.findById(decoded.id);
      if (!req.user) return res.status(401).json({ success: false, message: 'User not found' });
    } else {
      const inMemoryUsers = global._inMemoryUsers || [];
      req.user = inMemoryUsers.find(u => u._id === decoded.id) || { id: decoded.id, _id: decoded.id, name: 'User' };
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};
