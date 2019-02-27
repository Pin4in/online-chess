import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';

interface Game {
  _id: string;
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private game: GameService, private user: UserService) { }
  games: Game[];

  ngOnInit() {
    this.game.games().subscribe(data => {
      this.games = data;
    });
  }

}
