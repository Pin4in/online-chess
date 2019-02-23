import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private game: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private user: UserService
  ) {}

  public fen: string;
  private gameId: string;
  public userSide: string;

  public title: string;

  // move to header component
  public username: string;

  ngOnInit() {
    this.username = this.user.user.username;
    this.gameId = this.route.snapshot.paramMap.get('id');


    this.game.userConnected().subscribe(data => {
      console.log('connected', data);
    });

    this.game.loadGame(this.gameId);

    this.game.handleNotFound().subscribe(() => {
      this.router.navigate(['/']);
    });

    this.game.gameData.subscribe(game => {
      this.fen = game.fen;
      this.userSide = !this.userSide ? game.side : this.userSide;
      this.title = !this.title ? game.title : this.title;
    });

    this.game.gameUpdates.subscribe(fen => {
      this.fen = fen;
    });

    // TODO: handle game_update_error
  }

  saveMove(fen) {
    this.game.newMove({ fen, id: this.gameId});
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
