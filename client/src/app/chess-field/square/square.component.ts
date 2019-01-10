import { Component, Input, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { faChessPawn, faChessRook, faChessQueen, faChessKnight, faChessKing, faChessBishop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chess-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  @Input() row: number;
  @Input() col: number;

  public rook = faChessRook;
  public king = faChessKing;

  @HostBinding('class.canMove') canMove = false;
  @HostBinding('class.castling') castling = null;

}
