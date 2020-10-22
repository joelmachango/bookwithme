import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../rental/shared/rental.service';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {


  constructor(private userService: RentalService) { }



  ngOnInit() {
    this.getUserRentals()
  }

  getUserRentals() {
  this.userService.getUserRentals().subscribe(
    (userRentals) => {
      console.log("Rentals")
      console.log(userRentals)
    },
    () => {
      
    }
  )
  }

}
