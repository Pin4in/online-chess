import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { UserService } from './user.service';

interface Game {
  competitorId: number;
  fen: string;
  owner: boolean;
  side: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient, private socket: Socket, private user: UserService) { }

  gameUpdates = this.socket.fromEvent<Game>('game_update');

  /**
   * Load games
   */
  games() {
    return this.http.get<any>(`${config.privateApi}/games/`)
    .pipe(catchError(this.handleError('load games')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  userConnected() {
    return this.socket.fromEvent('connected');
  }

  loadGame(id) {
    const data = {
      userId: this.user.user.id,
      id
    };

    return this.socket.emit('start_game', data);
  }

  handleNotFound() {
    return this.socket.fromEvent('game_not_found');
  }

  handleGameUpdateError() {
    return this.socket.fromEvent('game_update_error');
  }

  newMove(data) {
    return this.socket.emit('new_move', data);
  }

}
