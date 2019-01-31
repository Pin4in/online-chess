import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }
  private GAME_API_URL  = `${config.privateApi}/game/`;
  // remove this
  private GAME_ID = '1';
  // move(fen) {
  //   const data = { fen };
  //   const options = {
  //     method: 'PUT',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };
  //   return fetch(`${this.GAME_API_URL}${this.GAME_ID}`, options)
  //     .then(res => {
  //       if (res.status === 404) {
  //         throw new Error('Can`t save move');
  //       }
  //     })
  //     .then(res => {
  //       console.log('game.move', res);
  //     });
  // }
  move(fen) {
    return this.http.put<any>(`${this.GAME_API_URL}${this.GAME_ID}`, { fen });
  }
  load() {
    // load game from db
    return this.http.get<any>(`${this.GAME_API_URL}${this.GAME_ID}`);
  }

}
