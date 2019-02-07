import { Directive, ElementRef, HostBinding, HostListener, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DraggableDirective } from '../draggable/draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ChessService } from './chess.service';


interface Position {
  x: number;
  y: number;
}

interface Move {
  from: Position;
  to: Position;
}

@Directive({
  selector: '[appChessFigureBehavior]'
})
export class ChessFigureBehaviorDirective extends DraggableDirective implements OnInit {
  @Input() row;
  @Input() cell;
  @Input() piece;
  @Output() makeMove = new EventEmitter<Move>();

  @HostBinding('style.top') get top(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `${this.position.y}px`
    );
  }

  @HostBinding('style.left') get left(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `${this.position.x}px`
    );
  }

  @HostBinding('class.movable') movable = true;
  @HostBinding('class.is-moving') isMoving = false;
  constructor(private sanitizer: DomSanitizer, public element: ElementRef, private chess: ChessService
    ) {
    super();
  }
  public position: Position = {x: 0, y: 0};

  // private defaultPosition: Position;
  private startPosition: Position;
  // private lastPosition;
  private cellSize = 50;

  ngOnInit() {
    // TODO @Input x and y;
    this.position.x = this.cell * this.cellSize;
    this.position.y = this.row * this.cellSize;
    // this.position.x = this.ctrl.figure.x * this.cellSize;
    // this.position.y = this.ctrl.figure.y * this.cellSize;
    // this.defaultPos = {
    //   x: this.position.x,
    //   y: this.position.y
    // };
    // this.lastPosition = Object.assign({}, this.defaultPos);
    // this.defaultPosition = Object.assign({}, this.position);
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    if (this.piece.color !== this.chess.turn()) {
      return false;
    }
    this.isMoving = true;
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    };
  }
  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent) {
    if (this.piece.color !== this.chess.turn()) {
      return false;
    }

    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
    // console.log(this.position);
  }
  @HostListener('dragEnd', ['$event'])
  onDragEnd() {
    if (this.piece.color !== this.chess.turn()) {
      return false;
    }
    const x: number = Math.round(this.position.x / this.cellSize);
    // const x: number = Math.abs(this.position.x / this.cellSize) > 0.5
    //   ? Math.round(this.position.x / this.cellSize)
    //   : this.cell
    // ;
    const y: number = Math.round(this.position.y / this.cellSize);
    // const y: number = Math.abs(this.position.y / this.cellSize) > 0.5
    //   ? Math.round(this.position.y / this.cellSize)
    //   : this.row
    // ;

    const from = { x: this.cell, y: this.row };
    const to = {x, y};
    this.makeMove.emit({from, to});

    // this.isMoving = false;
    // const x: number = Math.abs(this.position.x / this.cellSize) > 0.65
    //   ? Math.round(this.position.x / this.cellSize)
    //   : 0
    // ;
    // const y: number = Math.abs(this.position.y / this.cellSize) > 0.65
    //   ? Math.round(this.position.y / this.cellSize)
    //   : 0
    // ;

    // if (this.fieldState.moveFigure({x: 2, y: 1}, {x, y})) {
    //   this.position.x = this.cellSize * x;
    //   this.position.y = this.cellSize * y;
    //   this.lastPosition = {
    //     x: this.position.x,
    //     y: this.position.y
    //   };
    // } else {
    //   console.log('invalid move');
    //   this.position = Object.assign({}, this.lastPosition);
    // }
  }
}
