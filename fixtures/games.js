const game1 = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  _owner: 'Paper',
  _competitor: 'Rock',
  ownerSide: 'w',
  title: 'Paper vs Rock'
}
const game2 = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  _owner: 'Paper',
  _competitor: 'Scissors',
  ownerSide: 'b',
  title: 'Paper vs Scissors'
}
const game3 = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  _owner: 'Scissors',
  _competitor: 'Rock',
  ownerSide: 'w',
  title: 'Scissors vs Rock'
}

module.exports = [game1, game2, game3];