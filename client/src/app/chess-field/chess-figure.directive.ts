import { Directive, ElementRef, HostBinding, HostListener, Self, Host, OnInit } from '@angular/core';
import { DraggableDirective } from '../draggable/draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ChessBoardService } from './field-state.service';
import { ChessFigureComponent } from './chess-figure/chess-figure.component';


interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[appChessFigure]'
})
export class ChessFigureDirective extends DraggableDirective implements OnInit {
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
  constructor(private sanitizer: DomSanitizer, private fieldState: ChessBoardService,
    public element: ElementRef,
    @Host() @Self() private ctrl: ChessFigureComponent) {
    super();
  }
  public position: Position = {x: 0, y: 0};

  private defaultPos;
  private startPosition: Position;
  private lastPosition;
  private cellSize = 50;

  ngOnInit() {
    this.position.x = this.ctrl.figure.x * this.cellSize;
    this.position.y = this.ctrl.figure.y * this.cellSize;
    this.defaultPos = {
      x: this.position.x,
      y: this.position.y
    };
    this.lastPosition = Object.assign({}, this.defaultPos);
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    if (this.ctrl.activeSide !== this.ctrl.figure.side) {
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
    if (this.ctrl.activeSide !== this.ctrl.figure.side) {
      return false;
    }

    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
  }
  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {
    if (this.ctrl.activeSide !== this.ctrl.figure.side) {
      return false;
    }

    this.isMoving = false;
    const x: number = Math.abs(this.position.x / this.cellSize) > 0.65
      ? Math.round(this.position.x / this.cellSize)
      : 0
    ;
    const y: number = Math.abs(this.position.y / this.cellSize) > 0.65
      ? Math.round(this.position.y / this.cellSize)
      : 0
    ;

    if (this.fieldState.moveFigure(this.ctrl.figure, {x, y})) {
      this.position.x = this.cellSize * x;
      this.position.y = this.cellSize * y;
      this.lastPosition = {
        x: this.position.x,
        y: this.position.y
      };
    } else {
      console.log('invalid move');
      this.position = Object.assign({}, this.lastPosition);
    }
  }
}
