import { Component, OnInit } from '@angular/core';
import { Booking } from '../../booking/shared/booking.model';
import { BookingService } from '../../booking/shared/booking.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  bookings: Booking[]

  constructor(private userService: BookingService) { }

  ngOnInit() {
    this.getUserBookings()
  }

  getUserBookings() {
  this.userService.getUserBookings().subscribe(
    (userBookings) => {
      this.bookings = userBookings
      console.log("Bookings")
      console.log(userBookings)
    },
    () => {
      
    }
  )
  }

}
