import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) { }

  /**
   * Update game
   * @param fen - current fen
   * @param id - game id
   */
  update(fen: string, id: string) {
    return this.http.put<any>(`${config.privateApi}/game/${id}`, { fen })
      .pipe(catchError(this.handleError('move')));
  }

  /**
   * Load game
   * @param id - game id
   */
  load(id: string) {
    return this.http.get<any>(`${config.privateApi}/game/${id}`)
      .pipe(catchError(this.handleError('load game')));
  }

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

}
