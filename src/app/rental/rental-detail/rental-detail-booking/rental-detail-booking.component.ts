import { Component, Input, OnInit } from '@angular/core';
import { Booking } from '../../../booking/shared/booking.model'
import { HelperService } from '../../../common/service/helper.service';
import * as moment from 'moment'

@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() price: Number;
  @Input() bookings: Booking[]

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
    if (this.bookings && this.bookings.length > 0) {
      this.bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt)
        // destructurizing dates array to elements
        this.bookedOutDates.push(...dateRange)
      })
    }
  }

  public selectedDate(value: any, datepicker?: any) {

    this.newBooking.startAt = this.helper.formatBookingDate(value.start)
    this.newBooking.endAt = this.helper.formatBookingDate(value.end)
    this.newBooking.days = -(value.start.diff(value.end, 'days'))

    console.log(this.newBooking)


    // use passed valuable to update state
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

}
