import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../config';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) { }

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
          localStorage.setItem('token', user.token);
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
