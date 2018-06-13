import { Directive, ElementRef, OnInit, HostListener, Self, Host } from '@angular/core';
import { MovableDirective } from '../draggable/movable.directive';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldStateService } from './field-state.service';
import { ChessFigureComponent } from './chess-figure/chess-figure.component';

@Directive({
  selector: '[appChessFigure]'
})
export class ChessFigureDirective extends MovableDirective {

  constructor(sanetizer: DomSanitizer,
    element: ElementRef,
    private fieldState: FieldStateService,
    @Host() @Self() private ctrl: ChessFigureComponent) {
    super(sanetizer, element);
  }
  private defaultPos;
  // @HostListener('dragStart', ['$event'])
  // onDragStart(event: PointerEvent) {
  // }
  // @HostListener('dragMove', ['$event'])
  // onDragMove(event: PointerEvent) {
  // }
  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {
    const cellSize = 50;
    const x = Math.abs(this.position.x / cellSize) > 0.65
      ? Math.round(this.position.x / cellSize)
      : 0
    ;
    const y = Math.abs(this.position.y / cellSize) > 0.65
      ? Math.round(this.position.y / cellSize)
      : 0
    ;

    this.position.x = cellSize * x;
    this.position.y = cellSize * y;

    if (!this.defaultPos) {
      this.defaultPos = {
        x: this.ctrl.figure.x,
        y: this.ctrl.figure.y
      };
    }
    const shift = {
      x: this.defaultPos.x + x,
      y: this.defaultPos.y + y
    };

    this.fieldState.moveFigure(this.ctrl.figure, shift);
  }
}
