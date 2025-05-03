const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database to ensure they still exist
    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    // Check if user is suspended
    if (user.isSuspended) {
      return res.status(403).json({ message: 'User account is suspended' });
    }

    // Attach user info to request
    req.user = {
      username: user.username,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
