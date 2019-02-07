import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private game: GameService,
    private route: ActivatedRoute,
    private location: Location) { }

  public fen: string;
  private gameId: string;

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id');

    this.game.load(this.gameId)
      .subscribe((game: any) => {
        this.fen = game.fen;
      }, err => {
        // TODO: add board error for template
        console.log('game load error', err);
      });
  }

  saveMove(fen) {
    this.game.update(fen, this.gameId)
      .subscribe(move => {
        this.fen = move.fen;
      },
        err => console.error('Error on make move: ' + err),
      );
  }

  goBack() {
    this.location.back();
  }

}
