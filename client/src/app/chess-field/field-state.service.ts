import { Injectable } from '@angular/core';
import {  faChessPawn,
          faChessRook,
          faChessQueen,
          faChessKnight,
          faChessKing,
          faChessBishop } from '@fortawesome/free-solid-svg-icons';
import { MoveValidationService } from './move-validation.service';

interface FigureMeta {
  type: string;
  icon: any;
  side: boolean;
  alive: boolean;
  id: string;
  x: number;
  y: number;
}

interface PawnMeta extends FigureMeta {
  firstMove: boolean;
  enPassant: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FieldStateService {
  constructor(private MoveValidation: MoveValidationService) {}
  private defaultPositions = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['r', 'n', 'b', 'k', 'q', 'b', 'n', 'r']
  ];
  public activeSide = true; // white by default
  public state;
  public figures = {};
  private figureIndex = 0;

  private getId(type, side: true) {
    const i = this.figureIndex;
    this.figureIndex++;
    return `${type}-${ side ? 'w' : 'b' }-${i}`;
  }

  private makeFigureModel(item, x, y, side): string {
    let icon = null;

    if (item === 'r') { icon = faChessRook; }
    if (item === 'n') { icon = faChessKnight; }
    if (item === 'b') { icon = faChessBishop; }
    if (item === 'q') { icon = faChessQueen; }
    if (item === 'k') { icon = faChessKing; }
    if (item === 'p') { icon = faChessPawn; }

    const id = this.getId(item, side);
    const figure: FigureMeta = {
      type: item,
      icon,
      side,
      alive: true,
      id,
      x,
      y,
    };
    if (item === 'p') {
      const pawn: PawnMeta = Object.assign({firstMove: true, enPassant: false}, figure);
      this.figures[id] = pawn;
    } else {
      this.figures[id] = figure;
    }
    return id;
  }
  generateField() {
    const wTeam = this.defaultPositions[0].map((item, i) => {
      const initialY = 7;
      const side = true;
      const id = this.makeFigureModel(item, i, initialY, side);
      return id;
    });
    const wPawns = [];
    for (let i = 0; i < 8 ; i++) {
      const initialY = 6;
      const side = true;
      const id = this.makeFigureModel('p', i, initialY, side);
      wPawns.push(id);
    }
    const bTeam = this.defaultPositions[1].map((item, i) => {
      const initialY = 0;
      const side = false;
      const id = this.makeFigureModel(item, i, initialY, side);
      return id;
    });
    const bPawns = [];
    for (let i = 0; i < 8 ; i++) {
      const initialY = 1;
      const side = false;
      const id = this.makeFigureModel('p', i, initialY, side);
      bPawns.push(id);
    }

    const blunkRow = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'];

    this.state = [
      bTeam,
      bPawns,
      [...blunkRow],
      [...blunkRow],
      [...blunkRow],
      [...blunkRow],
      wPawns,
      wTeam
    ];

    return this.state;
  }
  private makeMove(figure, newPosition): void {
    const target = this.state[newPosition.y][newPosition.x];
    console.log('Target:', target);
    // going for the kill
    if (target !== 'x') {
      this.figures[target].alive = false;
    }

    // update last position
    this.state[figure.y][figure.x] = 'x';
    // update new position
    this.state[newPosition.y][newPosition.x] = figure.id;

    // update current figure position info
    this.figures[figure.id].x = newPosition.x;
    this.figures[figure.id].y = newPosition.y;


    this.activeSide = !this.activeSide;
  }
  moveFigure(figure, newPosition): boolean {
    switch (figure.type) {
      case 'p': {
        // todo: suppoer En Passant move.
        if (!this.MoveValidation.validPawnMove(figure, newPosition, this.state)) {
          return false;
        }
        if (this.figures[figure.id].firstMove) {
          this.figures[figure.id].enPassant = true;
        } else {
          this.figures[figure.id].enPassant = false;
        }
        this.figures[figure.id].firstMove = false;
        break;
      }
      case 'n': {
        if (!this.MoveValidation.validKnightMove(figure, newPosition, this.state)) {
          return false;
        }
        break;
      }
      case 'b': {
        if (!this.MoveValidation.validBishopMove(figure, newPosition, this.state)) {
          return false;
        }
        break;
      }
      case 'r': {
        if (!this.MoveValidation.validRookMove(figure, newPosition, this.state)) {
          return false;
        }
        break;
      }
      case 'q': {
        if (!this.MoveValidation.validQueenMove(figure, newPosition, this.state)) {
          return false;
        }
        break;
      }
      case 'k': {
        // todo:
        //  - support castling;
        //  - support check;
        if (!this.MoveValidation.validKingMove(figure, newPosition, this.state)) {
          return false;
        }
        break;
      }
    }

    this.makeMove(figure, newPosition);
    return true;
  }
}
