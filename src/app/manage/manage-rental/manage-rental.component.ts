import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Rental } from '../../rental/shared/rental.model';
import { RentalService } from '../../rental/shared/rental.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

  rentals: Rental[]
  rentalDeleteIndex: number

  constructor(
    private userService: RentalService, 
    private rentalService: RentalService,    
    private vcr: ViewContainerRef, 
    private toastr: ToastsManager) {
      this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getUserRentals()
  }

  getUserRentals() {
  this.userService.getUserRentals().subscribe(
    (userRentals) => {
      this.rentals = userRentals
    },
    (err) => {
      console.log(err)
    }
  )
  }

  deleteRental(rentalId: string) {
    console.log(rentalId)
    this.rentalService.deleteRental(rentalId).subscribe(
      (res) => {
        this.rentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined
       console.log(res)
      },
      (errorResponse: HttpErrorResponse) => {
       console.log(errorResponse)   
       this.toastr.error('Error message', 'Error!');
      }
    )
   }

}
