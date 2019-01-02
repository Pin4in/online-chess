import { Component, Input, OnInit } from '@angular/core';
import {  faChessPawn,
  faChessRook,
  faChessQueen,
  faChessKnight,
  faChessKing,
  faChessBishop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chess-figure',
  templateUrl: './chess-figure.component.html',
  styleUrls: ['./chess-figure.component.css']
})
export class ChessFigureComponent implements OnInit {
  @Input() figure;
  @Input() activeSide;

  public icon = null;
  ngOnInit() {
    if (this.figure.type === 'r') { this.icon = faChessRook; }
    if (this.figure.type === 'n') { this.icon = faChessKnight; }
    if (this.figure.type === 'b') { this.icon = faChessBishop; }
    if (this.figure.type === 'q') { this.icon = faChessQueen; }
    if (this.figure.type === 'k') { this.icon = faChessKing; }
    if (this.figure.type === 'p') { this.icon = faChessPawn; }
  }
}
