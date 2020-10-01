import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from '../../../common/service/helper.service';
import * as moment from 'moment'

import { Booking } from '../../../booking/shared/booking.model'
import { Rental } from '../../shared/rental.model';

@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;

  newBooking: Booking

  public daterange: any = {};
  bookedOutDates: any[] = []

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(private helper: HelperService) { }

  ngOnInit() {
    this.newBooking = new Booking
    this.getBookedOutDates()
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {
    const bookings: Booking = this.rental.bookings
    console.log(bookings)

    // if (bookings && bookings.length > 0) {
    //   bookings.forEach((booking: Booking) => {
    //     const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt)
    //     // destructurizing dates array to elements
    //     this.bookedOutDates.push(...dateRange)
    //   })
    // }
  }

  reserveRental() {
    console.log(this.newBooking)
  }

  public selectedDate(value: any, datepicker?: any) {

    this.newBooking.startAt = this.helper.formatBookingDate(value.start)
    this.newBooking.endAt = this.helper.formatBookingDate(value.end)
    this.newBooking.days = -(value.start.diff(value.end, 'days'))
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate
  }



}
