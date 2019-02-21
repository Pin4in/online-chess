import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private game: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public fen: string;
  private gameId: string;

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id');


    this.game.userConnected().subscribe(data => {
      console.log('connected', data);
    });

    this.game.loadGame(this.gameId);

    this.game.handleNotFound().subscribe(() => {
      this.router.navigate(['/']);
    });

    this.game.gameUpdates.subscribe(data => {
      this.fen = data.fen;
    });

    // TODO: handle game_update_error
  }

  saveMove(fen) {
    this.game.newMove({ fen, id: this.gameId});
  }

  goBack() {
    // this.game._newMove();
    // this.location.back();
  }

}
