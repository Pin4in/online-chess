import { Directive, AfterContentInit, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { ChessFigureBehaviorDirective } from '../chess-field/chess-figure-behavior.directive';
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
  @Input() movableAreaPieces;
  private boundaries: Bounderies;
  private subscriptions: Subscription[] = [];

  constructor(private element: ElementRef, private cd: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.movableAreaPieces.changes.subscribe(() => {
        this.subscriptions.forEach(s => s.unsubscribe());

        this.movableAreaPieces.forEach(movable => {
          this.subscriptions.push(movable.dragStart.subscribe(() => this.measureBounderies(movable)));
          this.subscriptions.push(movable.dragMove.subscribe(() => this.maintainBoundaries(movable)));
        });
      });

      this.movableAreaPieces.notifyOnChanges();
    });
  }

  private measureBounderies(movable: ChessFigureBehaviorDirective) {
    console.log('drag start event caught');
    const viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
    const movableClientRect: ClientRect = movable.element.nativeElement.getBoundingClientRect();

    this.boundaries = {
      minX: viewRect.left - movableClientRect.left + movable.position.x,
      maxX: viewRect.right - movableClientRect.right + movable.position.x,
      minY: viewRect.top - movableClientRect.top + movable.position.y,
      maxY: viewRect.bottom - movableClientRect.bottom + movable.position.y
    };
  }

  private maintainBoundaries(movable: ChessFigureBehaviorDirective) {
    movable.position.x = Math.max(this.boundaries.minX, movable.position.x);
    movable.position.x = Math.min(this.boundaries.maxX, movable.position.x);
    movable.position.y = Math.max(this.boundaries.minY, movable.position.y);
    movable.position.y = Math.min(this.boundaries.maxY, movable.position.y);
  }
}
