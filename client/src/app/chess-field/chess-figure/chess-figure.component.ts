import { Component, HostListener, Input, OnInit, ContentChild, AfterContentInit } from '@angular/core';
// import { ChessFigureDirective } from '../chess-figure.directive';

@Component({
  selector: 'app-chess-figure',
  templateUrl: './chess-figure.component.html',
  styleUrls: ['./chess-figure.component.css']
})
export class ChessFigureComponent implements OnInit, AfterContentInit {
  @Input() figure;
  // @ContentChild(ChessFigureDirective) figureMove: ChessFigureDirective;
  private isWhite: boolean;
  ngOnInit(): void {
    this.isWhite = this.figure.side;
  }

  ngAfterContentInit(): void {
  }
  // @HostListener('dragStart', ['$event'])
  // onDragStart(event: PointerEvent) {
  //   console.log('got an event', event);
  // }
  // @HostListener('dragMove', ['$event'])
  // onDragMove(event: PointerEvent) {
  //   console.log('got an event', event);
  // }
  // @HostListener('dragMove', ['$event'])
  // onDragEnd(event: PointerEvent) {
  //   console.log('got an event', event);
  // }
}
