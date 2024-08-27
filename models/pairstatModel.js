const mongoose = require('mongoose')

const pairstatSchema = new mongoose.Schema({
  player1: {
    type: mongoose.Types.UUID,
    required: true,
  },
  player2: {
    type: mongoose.Types.UUID,
    required: true,
  },
  wins: {
    type: Number,
    default: 0,
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

// middleware to update the updated_at time before saving pair stats
pairstatSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// export
const PairStat = mongoose.model('PairStat', pairstatSchema);
module.exports = PairStat;
