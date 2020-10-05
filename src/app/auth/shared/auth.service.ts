import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable()
export class AuthService {

  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken()
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp)
  }

  public register(userData: any): Observable<any> {
    return this.http.post('api/v1/users/register', userData)
  }

  public login(userData: any): Observable<any> {
    return this.http.post('api/v1/users/auth', userData)
  }

  public logout() {
    localStorage.removeItem('bwm_auth')
    localStorage.removeItem('bwm_meta')

    this.decodedToken = new DecodedToken();

  }

  public saveToken(token: string) {
    this.decodedToken = jwt.decode(token)
    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
    return token
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration())
  }

  public getAuthToken(): string {
    return localStorage.getItem('bwm_auth')
  }

  public getUsername(): string {
    return this.decodedToken.username
  }
}