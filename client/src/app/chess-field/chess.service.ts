import { Injectable } from '@angular/core';
import Chess from 'chess.js';

interface GameState {
  draw: boolean;
  check: boolean;
  checkmate: boolean;
  stalemate: boolean;
  repetition: boolean;
  gameOver: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChessService {
  constructor() {}
  private chess = new Chess();
  private WHITE = 'w';
  private BLACK = 'b';

  // TODO:
  // specify default fen, and construct board with it
  // public currentFen = '';
  private ROWS = '87654321';
  private COLUMNS = 'abcdefgh';

  public state: GameState = {
    draw: false,
    check: false,
    checkmate: false,
    stalemate: false,
    repetition: false,
    gameOver: false
  };

  indexToPos(col, row) {
    return `${this.COLUMNS[col]}${this.ROWS[row]}`;
  }

  getMoveObj(_from, _to) {
    const from = this.indexToPos(_from.x, _from.y);
    const to = this.indexToPos(_to.x, _to.y);
    return {from, to};
  }

  legalMoves(from) {
    return this.chess.moves({square: from, verbose: true});
  }

  private legalMove(move) {
    const legalMoves = this.legalMoves(move.from);

    for (let i = 0; i < legalMoves.length; i++) {
      if (legalMoves[i].to === move.to) {
        return legalMoves[i];
      }
    }
    console.log('can\'t move 0');
    return false;
  }

  board(fen = null) {
    // TODO:
    // - creat board with FEN;
    // - save moves - move Object;
    if (fen) {
      this.chess = new Chess(fen);
      this.updateGameState();
    }
    const asciiDiagram = this.chess.ascii();
    const cleared = asciiDiagram.replace(/(\s\s\+\-*\+)|(\d\s\|\s)|(\s\|)/gm, '').trim();
    const rows = cleared.match(/.+$/gm).slice(0, -2);

    const board = [];
    let currentRow;
    let row;
    for ( let i = 0; i < rows.length; i++) {
      currentRow = rows[i].trim().split('  ');
      row = [];

      for (let j = 0; j < currentRow.length; j++) {
        if (currentRow[j] === '.') {
          row.push(currentRow[j]);
        } else if (currentRow[j] === currentRow[j].toUpperCase()) {
          row.push({
            type: currentRow[j].toLowerCase(),
            color: this.WHITE
          });
        } else {
          row.push({
            type: currentRow[j],
            color: this.BLACK
          });
        }
      }

      board.push(row);
    }
    return board;
  }

  move(from, to) {
    const moveObj = this.getMoveObj(from, to);

    if (this.legalMove(moveObj)) {
      const move = this.legalMove(moveObj);
      // TODO: support choose promotion
      if (move.promotion) {
        move.promotion = 'q';
      }

      this.chess.move(move);

      this.updateGameState();
      return this.chess.fen();
    }
    return false;
  }

  turn() {
    return this.chess.turn();
  }

  private updateGameState() {
    this.state.check = this.chess.in_check();

    if (this.chess.game_over()) {
      this.state.draw = this.chess.in_draw();
      this.state.checkmate = this.chess.in_checkmate();
      this.state.stalemate = this.chess.in_stalemate();
      this.state.repetition = this.chess.in_threefold_repetition();
      this.state.gameOver = this.chess.game_over();
    }
  }
}
