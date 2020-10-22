import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { ManageComponent } from './manage.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';

const routes:  Routes = [
  {
    path: "manage",
    component: ManageComponent,
    children: [
      {path: "bookings", component: ManageBookingComponent},
      {path: "rentals", component: ManageRentalComponent}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageComponent, ManageBookingComponent, ManageRentalComponent]
})
export class ManageModule { }
