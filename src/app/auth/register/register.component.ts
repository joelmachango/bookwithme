import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {}

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.formData)
  }
}
