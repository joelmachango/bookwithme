import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model'

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental: Rental
  rentalCategories = Rental.CATEGORIES

  constructor() { }

  ngOnInit() {
    this.newRental = new Rental()
    this.newRental.shared = false
  }

  creteRental() {
    console.log(this.newRental)
  }

}
