import { Component, Input, OnInit } from '@angular/core';
import { Booking } from '../../../booking/shared/booking.model';

@Component({
  selector: 'app-manage-rental-booking',
  templateUrl: './manage-rental-booking.component.html',
  styleUrls: ['./manage-rental-booking.component.scss']
})
export class ManageRentalBookingComponent implements OnInit {

  @Input() bookings: Booking[];

  constructor() {

  }

  ngOnInit() {
    console.log(this.bookings)
  }

}
