import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap, map, catchError } from 'rxjs/operators';

import User from '../models/models.user';
import { logoutUser } from '../store/user/user.actions';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.get<User[]>(this.baseURL + '?username=' + username).pipe(
      tap((users) => {
        if (users.length === 0) throw 'User does not exist';
        else if (users[0].password !== password) throw 'Invalid password';
      }),
      map((users) => users[0]),
      catchError((error) => throwError(`Request timed out`))
    );
  }

  register(username: string, password: string) {
    const user = { username: username, password: password, karma: 0 };
    return this.http.get<User[]>(this.baseURL + '?username=' + username).pipe(
      tap((user) => {
        if (user.length !== 0) throw 'User already exists';
      }),
      switchMap((_) => this.http.post(this.baseURL, user)),
      catchError((error) => throwError(`Request timed out`))
    );
  }

  getProfileImage(username: string) {
    return this.http.get<User[]>(this.baseURL + '?username=' + username).pipe(
      tap((users) => {
        if (users.length === 0) throw 'User does not exist';
      }),
      map((users) => users[0].profileImage),
      catchError((error) => throwError(`Request timed out`))
    );
  }
}
