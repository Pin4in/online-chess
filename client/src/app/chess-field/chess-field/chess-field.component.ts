import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ChessBoardService } from '../field-state.service';
import { ChessFigureBehaviorDirective } from '../chess-figure-behavior.directive';
import { Subscription } from 'rxjs';
import { ChessService } from '../chess.service';

// TODO: rename to chessBoard
@Component({
  selector: 'app-chess-field',
  templateUrl: './chess-field.component.html',
  styleUrls: ['./chess-field.component.css']
})
export class ChessFieldComponent implements OnInit, AfterViewInit {
  @ViewChildren(ChessFigureBehaviorDirective) figures: QueryList<ChessFigureBehaviorDirective>;
  constructor(private fieldState: ChessBoardService, private chess: ChessService, private cd: ChangeDetectorRef) { }
  private subscriptions: Subscription[] = [];

  public field;
  public turn;

  ngOnInit() {
    this.fieldState.generateField();
    this.field = this.chess.board();
    this.turn = this.chess.turn;

  }
  ngAfterViewInit() {
    // TODO: merge chessfield with movable-aria directive
    this.cd.detectChanges();

    this.figures.changes.subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());

      this.figures.forEach(movable => {
        this.subscriptions.push(movable.dragEnd.subscribe(() => {

          // do I need this?
        }));
      });
    });

    this.figures.notifyOnChanges();
  }

  onMove(position) {
    console.log('move made', position);
    // make normal move
    // const from = 'b1';
    // const to = 'c3';
    // this.chess.moves({square: from});
    this.chess.move(position.from, position.to);
    this.field = this.chess.board();
    this.turn = this.chess.turn;
  }
}
