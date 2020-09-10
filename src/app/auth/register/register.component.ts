import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {}
  errors: any[] = []

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    // console.log(this.formData)
    this.auth.register(this.formData).subscribe(
      () => {
        this.router.navigate(['/auth/login', { registered: 'success' }])
        console.log('success')
      }
      ,
      (errorResponse) => {
        console.log(errorResponse.error.errors)
        this.errors = errorResponse.error.errors
      }
    )
  }
}
