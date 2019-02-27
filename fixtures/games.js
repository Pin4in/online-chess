const defaultFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const game1 = {
  fen: defaultFen,
  _owner: 'Paper',
  _competitor: 'Rock',
  ownerSide: 'w',
  title: 'Paper vs Rock'
}
const game2 = {
  fen: defaultFen,
  _owner: 'Paper',
  _competitor: 'Scissors',
  ownerSide: 'b',
  title: 'Paper vs Scissors'
}
const game3 = {
  fen: defaultFen,
  _owner: 'Scissors',
  _competitor: 'Rock',
  ownerSide: 'w',
  title: 'Scissors vs Rock'
}

module.exports = [game1, game2, game3];