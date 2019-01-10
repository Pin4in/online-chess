import { Injectable } from '@angular/core';
import Chess from 'chess.js';

@Injectable({
  providedIn: 'root'
})
export class ChessService {
  constructor() {}
  private chess = new Chess();
  private WHITE = 'w';
  private BLACK = 'b';

  public turn = 'w';
  private ROWS = '87654321';
  private COLUMNS = 'abcdefgh';

  public indexToPos(col, row) {
    return `${this.COLUMNS[col]}${this.ROWS[row]}`;
  }

  public getMoveObj(_from, _to) {
    const from = this.indexToPos(_from.x, _from.y);
    const to = this.indexToPos(_to.x, _to.y);
    return {from, to};
  }

  public validMoves(from) {
    return this.chess.moves({square: from, verbose: true});

  }

  private canMove(move) {
    const validMoves = this.validMoves(move.from);
    console.log('valid moves', validMoves);
    for (let i = 0; i < validMoves.length; i++) {
      if (validMoves[i].to === move.to) {
        console.log('can move +1');
        return true;
      }
    }
    console.log('cann\'t move 0');
    return false;
  }

  board() {
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
    console.log(`try move form ${moveObj.from}, to ${moveObj.to}`);
    if (this.canMove(moveObj)) {
      this.chess.move({from: moveObj.from, to: moveObj.to});
      this.updateState();
      return true;
    }
    return false;
  }

  private updateState() {
    this.turn = this.turn === this.WHITE ? this.BLACK : this.WHITE;
    // check
    // king under attak
  }
}
