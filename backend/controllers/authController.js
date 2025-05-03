const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  let { username, password, email } = req.body;

  // Trim input values to avoid accidental spaces
  username = username?.trim();
  password = password?.trim();
  email = email?.trim();

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Ensure that no null or empty values are passed
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: 'Invalid input. Please provide all required fields.' });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'Username or Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword,
      email,
      isLoggedIn: false,
    });

    // Save user to database
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// Login function
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    user.isLoggedIn = true;
    await user.save();

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET // No expiration time
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// Logout function
exports.logout = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res
        .status(400)
        .json({ error: 'No token provided. Please log in.' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!user.isLoggedIn) {
      return res.status(400).json({ error: 'User is already logged out.' });
    }

    user.isLoggedIn = false;
    await user.save();

    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};
