import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { HelperService } from '../../../common/service/helper.service';
import * as moment from 'moment'

import { Booking } from '../../../booking/shared/booking.model'
import { Rental } from '../../shared/rental.model';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../../../booking/shared/booking.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';



@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;

  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  bookings: any;
  newBooking: Booking;
  modalRef: any;

  public daterange: any = {};
  bookedOutDates: any[] = []
  errors: any[] = []

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    opens: 'center',
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    isInvalidDate: this.checkForInvalidDates.bind(this),
    autoUpdateInput: false
  };

  constructor(
    private helper: HelperService,
    private modalService: NgbModal,
    private bookingService: BookingService,
    private vcr: ViewContainerRef,
    private toastr: ToastsManager
  ) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    this.newBooking = new Booking
    this.getBookedOutDates()
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {
    this.bookings = this.rental.bookings
    const bookings = this.bookings

    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getRangeOfDates(booking.startAt, booking.endAt, Booking.DATE_FORMAT)
        // destructurizing dates array to elements
        this.bookedOutDates.push(...dateRange)
      })
    }
  }

  private addNewBookedDates(bookingData: any) {
    const dateRange = this.helper.getRangeOfDates(bookingData.startAt, bookingData.endAt, Booking.DATE_FORMAT)
    this.bookedOutDates.push(...dateRange)
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment())
    this.picker.datePicker.setEndDate(moment())
    this.picker.datePicker.element.val('')
  }

  openConfirmModal(content) {
    this.errors = []
    this.modalRef = this.modalService.open(content)
  }

  createBooking() {
    this.newBooking.rental = this.rental

    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData: any) => {
        this.addNewBookedDates(bookingData)
        this.newBooking = new Booking()
        this.modalRef.close()
        this.resetDatePicker()
        this.toastr.success('Booking successfully created, check your booking details in manage section', 'Success!');
        console.log(bookingData)
      },
      (errorResponse: any) => {
        this.errors = errorResponse.error.errors
      }
    )
  }

  public selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true
    this.newBooking.startAt = this.helper.formatBookingDate(value.start)
    this.newBooking.endAt = this.helper.formatBookingDate(value.end)
    this.newBooking.days = -(value.start.diff(value.end, 'days'))
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate
  }

  showModal(content) {
    this.modalService.open(content).result.then(
      (closeResult) => {
        //modal close  
        console.log("modal closed : ", closeResult);
      }, (dismissReason) => {
        //modal Dismiss  
        if (dismissReason == ModalDismissReasons.ESC) {
          console.log("modal dismissed when used pressed ESC button");
        } else if (dismissReason == ModalDismissReasons.BACKDROP_CLICK) {
          console.log("modal dismissed when used pressed backdrop");
        } else {
          console.log(dismissReason);
        }
      })
  }

}

