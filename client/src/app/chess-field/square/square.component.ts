import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faChessPawn, faChessRook, faChessQueen, faChessKnight, faChessKing, faChessBishop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chess-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  ngOnInit() {
  }
}
