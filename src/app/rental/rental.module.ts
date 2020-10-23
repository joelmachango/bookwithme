import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { NgPipesModule } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';

import { RentalService } from './shared/rental.service';
import { HelperService } from '../common/service/helper.service';
import { ModalService } from './shared/modal.service';
import { BookingService } from '../booking/shared/booking.service';



import { AuthGuard } from '../auth/shared/auth.guard';

import { RentalComponent } from "./rental.component";
import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { RentalDetailsBookingComponent } from './rental-details/rental-details-booking/rental-details-booking.component';

const routes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      { path: "new", component: RentalCreateComponent, canActivate: [AuthGuard] },
      { path: ':rentalId', component: RentalDetailsComponent },
      { path: ':city/homes', component: RentalSearchComponent }
    ]
  }
]


@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailsComponent,
    RentalSearchComponent,
    RentalCreateComponent,
    RentalDetailsBookingComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule
  ],
  providers: [RentalService, AuthGuard, HelperService, ModalService, BookingService]
})

export class RentalModule { }