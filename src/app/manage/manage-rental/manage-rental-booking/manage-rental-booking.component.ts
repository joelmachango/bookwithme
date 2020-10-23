import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../../../booking/shared/booking.model';

@Component({
  selector: 'app-manage-rental-booking',
  templateUrl: './manage-rental-booking.component.html',
  styleUrls: ['./manage-rental-booking.component.scss']
})
export class ManageRentalBookingComponent implements OnInit {

    errors: any[] = []
modalRef: any

  @Input() bookings: Booking[];

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

   openConfirmModal(content) {
    this.errors = []
    this.modalRef = this.modalService.open(content)
  }

}
