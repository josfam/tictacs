const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  player1: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  player2: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  winner : {
    type: mongoose.Types.ObjectId,
    default: null,
  },
  loser: {
    type: mongoose.Types.ObjectId,
    default: null,
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

// middleware to update the updated_at time before saving games
gameSchema.pre('save', function(next) {
  gameSchema.updated_at = Date.now();
  next();
});

// export
const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
