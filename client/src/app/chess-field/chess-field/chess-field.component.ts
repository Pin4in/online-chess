import { Component, OnInit, Input, ViewChildren, QueryList,
  AfterViewInit, ChangeDetectorRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChessService } from '../chess.service';
import { ChessFigureBehaviorDirective } from '../chess-figure-behavior.directive';
import { SquareComponent } from '../square/square.component';

// TODO: rename to chessBoard
@Component({
  selector: 'app-chess-field',
  templateUrl: './chess-field.component.html',
  styleUrls: ['./chess-field.component.css']
})
export class ChessFieldComponent implements AfterViewInit, OnChanges {
  @ViewChildren(ChessFigureBehaviorDirective) figures: QueryList<ChessFigureBehaviorDirective>;
  @ViewChildren(SquareComponent) squares: QueryList<SquareComponent>;
  constructor(private chess: ChessService, private cd: ChangeDetectorRef) { }
  private subscriptions: Subscription[] = [];

  @Input() fen: string;
  @Input() userSide: string;
  @Output() saveMove = new EventEmitter();

  public board;

  private updateState(fen) {
    this.board = this.chess.board(fen).map(row => {
      for (let i = 0; i < row.length; i++) {
        const activeFigure = row[i].color === this.chess.turn();
        const userFigure = this.userSide === row[i].color;

        if (activeFigure && userFigure) {
          row[i].active = true;
        }
      }
      return row;
    });
  }

  ngOnChanges() {
    if (this.fen) {
      this.updateState(this.fen);
    }
  }

  ngAfterViewInit() {
    // TODO: merge chessfield with movable-aria directive
    this.cd.detectChanges();

    this.figures.changes.subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());

      this.figures.forEach(figure => {
        this.subscriptions.push(figure.dragStart.subscribe(() => this.validMoves(figure)));
      });
    });

    this.figures.notifyOnChanges();
  }

  private validMoves(figure: ChessFigureBehaviorDirective) {
    const from = this.chess.indexToPos(figure.cell, figure.row);
    const validMoves = this.chess.legalMoves(from);

    this.squares.find(item => {
      const userTurn = this.chess.turn() === this.userSide;
      const activeFigure = this.board[figure.row][figure.cell].color === this.chess.turn();
      if (!userTurn || !activeFigure) {
        return false;
      }

      const squarePos = this.chess.indexToPos(item.col, item.row);
      for (let i = 0; i < validMoves.length; i++) {
        if (squarePos === validMoves[i].to) {
          item.canMove = true;
          item.castling = ['k', 'q'].find(flag => {
            return validMoves[i].flags.indexOf(flag) !== -1;
          }) || null;
        }
      }
      return false;
    });
  }

  makeMove(position) {
    // don't update gameUI before save. Should move chess.move to the BE.
    const newFen = this.chess.move(position.from, position.to);

    if (newFen) {
      this.saveMove.emit(newFen);
    } else {
      // temporary fix for field reset if user did not make any move but touched the figure.
      this.updateState(this.fen);
    }

  }
}
