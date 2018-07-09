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
    const x = Math.abs(figure.x - newPosition.x);
    const y = Math.abs(figure.y - newPosition.y);

    const doubleMove = y === 2 && x === 0 && figure.firstMove;
    const simpleMove = y === 1 && x === 0;
    const killMove = y === 1 && x === 1;
    const isOccupied = this.isOccupied(newPosition, fieldState);
    const canKill = this.canKill(newPosition, figure.side, fieldState);

    if (doubleMove || simpleMove) {
      if (!isOccupied) {
        return true;
      }
    }

    if (killMove && isOccupied && canKill) {
      return true;
    }

    return false;
  }

  validKnightMove(figure, newPosition, fieldState): boolean {
    const x = Math.abs(figure.x - newPosition.x);
    const y = Math.abs(figure.y - newPosition.y);

    const hMove = x === 2 && y === 1;
    const vMove = x === 1 && y === 2;

    if (hMove || vMove) {
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
    const x = Math.abs(figure.x - newPosition.x);
    const y = Math.abs(figure.y - newPosition.y);

    const hMove = x > 0 && y === 0;
    const vMove = x === 0 && y > 0;

    if (hMove || vMove) {
      if (!this.isOccupied(newPosition, fieldState)) {
        return true;
      }
      if (this.canKill(newPosition, figure.side, fieldState)) {
        return true;
      }
    }

    return false;
  }
  validBishopMove(figure, newPosition, fieldState): boolean {
    const x = Math.abs(figure.x - newPosition.x);
    const y = Math.abs(figure.y - newPosition.y);

    const dMove = x === y && x !== 0;

    if (dMove) {
      if (!this.isOccupied(newPosition, fieldState)) {
        return true;
      }
      if (this.canKill(newPosition, figure.side, fieldState)) {
        return true;
      }
    }

    return false;
  }

  validQueenMove(figure, newPosition, fieldState): boolean {
    const x = Math.abs(figure.x - newPosition.x);
    const y = Math.abs(figure.y - newPosition.y);

    const hMove = x > 0 && y === 0;
    const vMove = x === 0 && y > 0;
    const dMove = x === y && x !== 0;

    if (hMove || vMove || dMove) {
      if (!this.isOccupied(newPosition, fieldState)) {
        return true;
      }
      if (this.canKill(newPosition, figure.side, fieldState)) {
        return true;
      }
    }

    return false;
  }

  validKingMove(figure, newPosition, fieldState): boolean {
    const x = Math.abs(figure.x - newPosition.x);
    const y = Math.abs(figure.y - newPosition.y);

    const hMove = x === 1 && y === 0;
    const vMove = x === 0 && y === 1;
    const dMove = x === 1 && y === 1;

    if (hMove || vMove || dMove) {
      if (!this.isOccupied(newPosition, fieldState)) {
        return true;
      }
      if (this.canKill(newPosition, figure.side, fieldState)) {
        return true;
      }
    }

    return false;
  }

}
