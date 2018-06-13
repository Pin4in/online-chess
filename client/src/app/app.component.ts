import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { faChessPawn,
         faChessRook,
         faChessQueen,
         faChessKnight,
         faChessKing,
         faChessBishop } from '@fortawesome/free-solid-svg-icons';
import { FieldStateService } from './chess-field/field-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private elem: ElementRef, public fState: FieldStateService) {}
  title = 'app';
  faChessPawn = faChessPawn;
  faChessKnight = faChessKnight;
  faChessQueen = faChessQueen;
}



