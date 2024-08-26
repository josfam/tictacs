// User schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  stats: {
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    draws: {
      type: Number,
      default: 0,
    }
  },
  online: {
    type: Boolean,
    default: false,
  },
  in_game: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  }
});

// middleware to update created at time before persisting a user
userSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// export
const User = mongoose.model('User', userSchema);
module.exports = User;
