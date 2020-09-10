import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
\
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './shared/auth.service'

const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent }
    ]
  }
]

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
