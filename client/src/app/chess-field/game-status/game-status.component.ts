import { Component, OnInit } from '@angular/core';
import { ChessService } from '../chess.service';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.css']
})
export class GameStatusComponent {
  constructor(public chess: ChessService) {}
}
