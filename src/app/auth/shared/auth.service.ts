import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken'
// import 'rxjs/Rx'




class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable()
export class AuthService {

  private decodedToken;

  constructor(private http: HttpClient) { }

  public register(userData: any): Observable<any> {
    return this.http.post('api/v1/users/register', userData)
  }

  public login(userData: any): Observable<any> {
    console.log(userData)
    return this.http.post('api/v1/users/auth', userData

      // Save token to localStorage

      // .map(
      //   (token: string) => this.saveToken(token)
      // )
    )
  }

  public saveToken(token: string) {
    this.decodedToken = jwt.decode(token)

    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
    return token
  }
}