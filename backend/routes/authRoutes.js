const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logout);

// Protected route
router.get('/profile', authMiddleware, (req, res) => {
  if (!req.user?.username || !req.user?.role) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  res.json({
    message: 'Welcome to your profile',
    username: req.user.username,
    role: req.user.role,
  });
});

module.exports = router;
