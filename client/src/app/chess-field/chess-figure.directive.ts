import { Directive, ElementRef, HostBinding, HostListener, Self, Host, OnInit } from '@angular/core';
import { MovableDirective } from '../draggable/movable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { FieldStateService } from './field-state.service';
import { ChessFigureComponent } from './chess-figure/chess-figure.component';


interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[appChessFigure]'
})
export class ChessFigureDirective extends MovableDirective implements OnInit {
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
  @HostBinding('style.position') get getPosition(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `absolute`
    );
  }
  @HostBinding('class.moving') isMoving = false;
  constructor(sanetizer: DomSanitizer,
    element: ElementRef,
    private fieldState: FieldStateService,
    @Host() @Self() private ctrl: ChessFigureComponent) {
    super(sanetizer, element);
  }
  private defaultPos;
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
  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {
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
