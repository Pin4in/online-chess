import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { faChessPawn,
         faChessRook,
         faChessQueen,
         faChessKnight,
         faChessKing,
         faChessBishop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private elem: ElementRef) {}
  title = 'app';
  faChessPawn = faChessPawn;
  faChessKnight = faChessKnight;
  faChessQueen = faChessQueen;

  ngOnInit() {
  }

  onDragStart() {
    console.log('got drag start');
  }

  onDragMove() {
    console.log('got drag move');
  }

  onDragEnd() {
    console.log('got drag end');
  }
}



