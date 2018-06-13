import { Injectable } from '@angular/core';
import {  faChessPawn,
          faChessRook,
          faChessQueen,
          faChessKnight,
          faChessKing,
          faChessBishop } from '@fortawesome/free-solid-svg-icons';

interface FigureMeta {
  type: string;
  icon: any;
  side: boolean;
  alive: boolean;
  id: string;
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class FieldStateService {
  private defaultPositions = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['r', 'n', 'b', 'k', 'q', 'b', 'n', 'r']
  ];
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

    this.figures[id] = figure;

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
  private makeMove(figure, shift): void {
    const x = shift.x;
    const y = shift.y;

    if (this.state[y][x] !== 'x') {
      console.log('occupied');
      return;
    }

    this.state[y][x] = figure.id;
    this.state[figure.y][figure.x] = 'x';
    this.figures[figure.id].x = x;
    this.figures[figure.id].y = y;
  }

  private validPawnMove(): boolean {
    return true;
  }

  moveFigure(figure, shift): boolean {
    console.log('moveFigure');
    if (!this.validPawnMove()) {
      return false;
    }

    this.makeMove(figure, shift);
    return true;
  }
}