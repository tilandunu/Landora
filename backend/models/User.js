const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isLoggedIn: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
