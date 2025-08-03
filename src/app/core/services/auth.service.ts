import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { MESSAGE_CONSTANTS } from '../constants/message.constant';
import { User } from '../models/user.model';
import { LOCAL_STORAGE_CONSTANTS } from '../constants/local-storage.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}users/`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  get user() {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_CONSTANTS.USER_KEY);
      if (item) {
        return JSON.parse(item) as User;
      }
    } catch {
      console.log(MESSAGE_CONSTANTS.NO_USER);
    }
    return null;
  }

  get isLoggedIn() {
    return !!this.user;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  login(username: string, password: string) {
    return this.http.get<User[]>(this.baseUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.username === username && u.email === password);
        if (user) {
          localStorage.setItem(LOCAL_STORAGE_CONSTANTS.USER_KEY, JSON.stringify(user));
        }
        return user;
      }),
    );
  }

  authorized() {
    if (!this.user) {
      return of(false);
    }

    const url = `${this.baseUrl}${this.user?.id}`;
    return this.http.get<User>(url).pipe(map((user) => !!user));
  }
}
