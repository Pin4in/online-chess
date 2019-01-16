import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChessFigureComponent } from './chess-figure/chess-figure.component';
import { ChessFigureBehaviorDirective } from './chess-figure-behavior.directive';
import { ChessBoardService } from './field-state.service';
import { ChessFieldComponent } from './chess-field/chess-field.component';
import { DraggableModule } from '../draggable/draggable.module';
import { MoveValidationService } from './move-validation.service';
import { ChessService } from './chess.service';
import { SquareComponent } from './square/square.component';
import { GameStatusComponent } from './game-status/game-status.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    DraggableModule
  ],
  providers: [
    ChessBoardService,
    MoveValidationService,
    ChessService
  ],
  declarations: [ChessFigureComponent, SquareComponent, ChessFigureBehaviorDirective,
    ChessFieldComponent, GameStatusComponent],
  exports: [ChessFieldComponent, GameStatusComponent]
  // exports: [ChessFigureComponent, SquareComponent, ChessFigureBehaviorDirective,
  //   ChessFieldComponent, GameStatusComponent]
})
export class ChessFieldModule { }
