import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
export class ChessFieldComponent implements OnInit, AfterViewInit {
  @ViewChildren(ChessFigureBehaviorDirective) figures: QueryList<ChessFigureBehaviorDirective>;
  @ViewChildren(SquareComponent) squares: QueryList<SquareComponent>;
  constructor(private chess: ChessService, private cd: ChangeDetectorRef) { }
  private subscriptions: Subscription[] = [];

  public board;
  public turn;

  private updateState() {
    this.board = this.chess.board();
    this.turn = this.chess.turn;
  }

  ngOnInit() {
    this.updateState();

  }
  ngAfterViewInit() {
    // TODO: merge chessfield with movable-aria directive
    this.cd.detectChanges();
    // const soms = this.squares.find(item => {
    //   // console.log('square', this.chess.indexToPos(item.col, item.row));
    //   if (this.chess.indexToPos(item.col, item.row) === 'a1') {
    //     setTimeout(() => {
    //       item.canMove = true;
    //       // console.log(item);
    //     });
    //     // console.log(item);
    //     return;
    //   }
    //   return false;
    // });

    this.figures.changes.subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());

      this.figures.forEach(figure => {
        this.subscriptions.push(figure.dragStart.subscribe(() => this.validMoves(figure)));
        // this.subscriptions.push(movable.dragEnd.subscribe(() => {}));
        // this.subscriptions.push(movable.dragEnd.subscribe(() => {}));
      });
    });

    this.figures.notifyOnChanges();
  }

  private validMoves(figure: ChessFigureBehaviorDirective) {
    const from = this.chess.indexToPos(figure.cell, figure.row);
    console.log('starting position', from);
    const validMoves = this.chess.validMoves(from);
    console.log(validMoves);
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

  onMove(position) {
    this.chess.move(position.from, position.to);
    this.updateState();
  }
}
