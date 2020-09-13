import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private url: string

  constructor(private auth: AuthService,
    private router: Router) { }

  private handleAuthState(): boolean {
    if (this.isLoginORRegister()) {
      this.router.navigate(['rentals'])
      return false
    }
    return true
  }

  private handleNotAuthState(): boolean {
    if (this.isLoginORRegister()) {
      return true
    }
    this.router.navigate(['/auth/login'])
  }

  private isLoginORRegister(): boolean {
    if (this.url.includes('/auth/login') || this.url.includes('/auth/register')) {
      return true
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.url = state.url;

    if (this.auth.isAuthenticated()) {
      return this.handleAuthState()
    }

    return this.handleNotAuthState()
  }
}
