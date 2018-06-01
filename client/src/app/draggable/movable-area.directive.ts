import { Directive, ContentChildren, QueryList, AfterContentInit, ElementRef } from '@angular/core';
import { MovableDirective } from './movable.directive';
import { Subscription } from 'rxjs';

interface Bounderies {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

@Directive({
  selector: '[appMovableArea]'
})
export class MovableAreaDirective implements AfterContentInit {

  @ContentChildren(MovableDirective) movables: QueryList<MovableDirective>;

  private boundaries: Bounderies;
  private subscriptions: Subscription[] = [];

  constructor(private element: ElementRef) {}

  ngAfterContentInit(): void {
    this.movables.changes.subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());

      this.movables.forEach(movable => {
        this.subscriptions.push(movable.dragStart.subscribe(() => this.measureBounderies(movable)));
        this.subscriptions.push(movable.dragMove.subscribe(() => this.maintainBoundaries(movable)));
      });
    });

    this.movables.notifyOnChanges();
  }

  private measureBounderies(movable: MovableDirective) {
    const viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
    const movableClientRect: ClientRect = movable.element.nativeElement.getBoundingClientRect();

    this.boundaries = {
      minX: viewRect.left - movableClientRect.left + movable.position.x,
      maxX: viewRect.right - movableClientRect.right + movable.position.x,
      minY: viewRect.top - movableClientRect.top + movable.position.y,
      maxY: viewRect.bottom - movableClientRect.bottom + movable.position.y
    };
  }

  private maintainBoundaries(movable: MovableDirective) {
    movable.position.x = Math.max(this.boundaries.minX, movable.position.x);
    movable.position.x = Math.min(this.boundaries.maxX, movable.position.x);
    movable.position.y = Math.max(this.boundaries.minY, movable.position.y);
    movable.position.y = Math.min(this.boundaries.maxY, movable.position.y);
  }
}
