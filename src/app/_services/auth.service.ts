import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_model/user';
import { baseUrl } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = `${baseUrl}/user/`;
  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post(`${this.url}login`, user);
  }

  isAuthenticated(): boolean {
    // console.log(sessionStorage.getItem('token') !== null);
    const token = sessionStorage.getItem('token') !== null;
    const hours = 0.5;
    const saved = +sessionStorage.getItem('savedTime');
    if (
      token &&
      saved &&
      new Date().getTime() - saved < hours * 60 * 60 * 1000
    ) {
      return true;
    } else {
      return false;
    }
  }
}
