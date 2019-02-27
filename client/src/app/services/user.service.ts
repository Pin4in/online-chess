import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../config';
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }
  user: User;

  getUser() {
    return this.http.get<any>(`${config.privateApi}/user`)
      .pipe(map(user => {
        this.user = Object.assign({}, user);
        return user;
      }));
  }
}
