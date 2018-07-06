import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoveValidationService {
  private isOccupied(pos, fieldState): boolean {
    return fieldState[pos.y][pos.x] !== 'x';
  }

  private canKill(pos, side, fieldState): boolean {
    const targetSide = fieldState[pos.y][pos.x].indexOf('-w-') !== -1 ? true : false;
    return fieldState[pos.y][pos.x] !== 'x'
        && targetSide !== side;
  }

  validPawnMove(figure, newPosition, fieldState): boolean {
    let x, y;
    const freeCell = !this.isOccupied(newPosition, fieldState);
    if (figure.side) {
      x = figure.x - newPosition.x;
      y = figure.y - newPosition.y;
    } else {
      x = newPosition.x - figure.x;
      y = newPosition.y - figure.y;
    }

    if (y > 0 && y < 3 && x === 0) {
      if (y === 1 && freeCell) {
        return true;
      }
      if (y === 2 && freeCell && figure.firstMove) {
        return true;
      }
    }
    if (this.canKill(newPosition, figure.side, fieldState) && y === 1 && (x === 1 || x === -1)) {
      return true;
    }
    return false;
  }

  validKnightMove(figure, newPosition, fieldState): boolean {
    const x = Math.abs(figure.x - newPosition.x);
    const y = Math.abs(figure.y - newPosition.y);

    const horizontalMove = x === 2 && y === 1;
    const verticalMove = x === 1 && y === 2;

    if (horizontalMove || verticalMove) {
      if (!this.isOccupied(newPosition, fieldState)) {
        return true;
      }

      if (this.canKill(newPosition, figure.side, fieldState)) {
        return true;
      }
    }
    return false;
  }

  validRookMove(figure, newPosition, fieldState): boolean {

    return false;
  }
}
