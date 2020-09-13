import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptor } from './shared/token.interceptor'

import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './shared/auth.service'
import { AuthGuard } from './shared/auth.guard';


const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "register", component: RegisterComponent, canActivate: [AuthGuard] },
      { path: "login", component: LoginComponent, canActivate: [AuthGuard] }
    ]
  }
]

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:
    [AuthService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }]
})
export class AuthModule { }
