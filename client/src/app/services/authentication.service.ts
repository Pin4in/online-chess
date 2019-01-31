import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../config';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  signup(username: string, password: string, password2: string, email: string) {
    return this.http.post<any>(`${config.publicApi}/signup`, { username, password, password2, email })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('token', JSON.stringify(user));
        }
      }));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${config.publicApi}/login`, { email, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('token', JSON.stringify(user.token));
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }
}
