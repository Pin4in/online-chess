import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChessFigureComponent } from './chess-figure/chess-figure.component';
import { ChessFigureDirective } from './chess-figure.directive';
import { ChessBoardService } from './field-state.service';
import { ChessFieldComponent } from './chess-field/chess-field.component';
import { DraggableModule } from '../draggable/draggable.module';
import { MoveValidationService } from './move-validation.service';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    DraggableModule
  ],
  providers: [
    ChessBoardService,
    MoveValidationService
  ],
  declarations: [ChessFigureComponent, ChessFigureDirective, ChessFieldComponent],
  exports: [ChessFigureComponent, ChessFigureDirective, ChessFieldComponent]
})
export class ChessFieldModule { }
