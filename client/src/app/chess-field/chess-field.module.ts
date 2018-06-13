import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChessFigureComponent } from './chess-figure/chess-figure.component';
import { ChessFigureDirective } from './chess-figure.directive';
import { FieldStateService } from './field-state.service';
import { ChessFieldComponent } from './chess-field/chess-field.component';
import { DraggableModule } from '../draggable/draggable.module';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    DraggableModule
  ],
  providers: [
    FieldStateService
  ],
  declarations: [ChessFigureComponent, ChessFigureDirective, ChessFieldComponent],
  exports: [ChessFigureComponent, ChessFigureDirective, ChessFieldComponent]
})
export class ChessFieldModule { }
