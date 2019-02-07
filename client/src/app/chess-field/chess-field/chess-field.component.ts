import { Component, OnInit, Input, ViewChildren, QueryList,
  AfterViewInit, ChangeDetectorRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChessService } from '../chess.service';
import { ChessFigureBehaviorDirective } from '../chess-figure-behavior.directive';
import { SquareComponent } from '../square/square.component';
import { GameService } from '../../services/game.service';

// TODO: rename to chessBoard
@Component({
  selector: 'app-chess-field',
  templateUrl: './chess-field.component.html',
  styleUrls: ['./chess-field.component.css']
})
export class ChessFieldComponent implements AfterViewInit, OnChanges {
  @ViewChildren(ChessFigureBehaviorDirective) figures: QueryList<ChessFigureBehaviorDirective>;
  @ViewChildren(SquareComponent) squares: QueryList<SquareComponent>;
  constructor(private chess: ChessService, private cd: ChangeDetectorRef, private game: GameService) { }
  private subscriptions: Subscription[] = [];

  @Input() fen: string = null;
  @Output() saveMove = new EventEmitter();

  public board;
  public turn;

  private updateState(fen = null) {
    // TODO: update with the new fen
    this.board = this.chess.board();
    this.turn = this.chess.turn;
  }

  ngOnChanges() {
    if (this.fen) {
      this.board = this.chess.board(this.fen);
      this.updateState();
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
    const newFen = this.chess.move(position.from, position.to);

    if (newFen) {
      this.saveMove.emit(newFen);
    }

    this.updateState();
  }
}
