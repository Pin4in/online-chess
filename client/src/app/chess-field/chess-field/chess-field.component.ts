import { Component, OnInit } from '@angular/core';
import { FieldStateService } from '../field-state.service';
// import { ChessFigureComponent } from '../chess-figure/chess-figure.component';
// import {  faChessPawn,
//           faChessRook,
//           faChessQueen,
//           faChessKnight,
//           faChessKing,
//           faChessBishop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chess-field',
  templateUrl: './chess-field.component.html',
  styleUrls: ['./chess-field.component.css']
})
export class ChessFieldComponent implements OnInit {

  constructor(private fieldState: FieldStateService) { }

  private field;
  ngOnInit() {
    this.fieldState.generateField();
    this.field = this.fieldState.state.map(item => {
      return item.map(figure => {
        if (figure === 'x') {
          return false;
        }

        return this.fieldState.figures[figure];
      });
    });
  }

}