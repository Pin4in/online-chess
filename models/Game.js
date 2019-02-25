const mongoose = require('../libs/mongoose');

const gameSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  competitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  // TODO: add FEN validation
  fen: {
    type: String,
    required: true,
  },
  ownerSide: {
    type: String,
    required: true,
  }

}, {
  timestamps: true,
});

module.exports = mongoose.model('Game', gameSchema);
