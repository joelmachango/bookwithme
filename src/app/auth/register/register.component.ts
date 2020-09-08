import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {}

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  register() {
    // console.log(this.formData)
    this.auth.register(this.formData).subscribe(
      () => {
        console.log('success')
      }
      ,
      (errorResponse) => {
        console.log(errorResponse)
      }
    )
  }
}
