import { Component, Input, OnInit } from '@angular/core';
import { faChessPawn, faChessRook, faChessQueen, faChessKnight, faChessKing, faChessBishop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chess-figure',
  templateUrl: './chess-figure.component.html',
  styleUrls: ['./chess-figure.component.css']
})
export class ChessFigureComponent implements OnInit {
  @Input() piece;


  public icon = null;
  public empty = false;
  ngOnInit() {
    if (this.piece.type === 'r') { this.icon = faChessRook; }
    if (this.piece.type === 'n') { this.icon = faChessKnight; }
    if (this.piece.type === 'b') { this.icon = faChessBishop; }
    if (this.piece.type === 'q') { this.icon = faChessQueen; }
    if (this.piece.type === 'k') { this.icon = faChessKing; }
    if (this.piece.type === 'p') { this.icon = faChessPawn; }
  }
}
