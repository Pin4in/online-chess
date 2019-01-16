import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  move(fen) {
    // save move to db
    console.log('game move called', fen);
    const data = { fen };
    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return fetch('http://127.0.0.1:3000/game/1', options)
      .then(res => {
        if (res.status === 404) {
          throw new Error('Can`t save move');
        }
      })
      .then(res => {
        console.log('game.move', res);
      });
  }

  load() {
    // load game from db
    return fetch('http://127.0.0.1:3000/game/1')
      .then(res => {
        if (res.status === 404) {
          throw new Error('User not found');
        }
        return res.json();
      })
      .then(game => {
        return game;
      })
      .catch(err => {
        console.error(err);
      });
  }

}
