import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { NgPipesModule } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';



import { RentalComponent } from "./rental.component";
import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalService } from './shared/rental.service';
import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { AuthGuard } from '../auth/shared/auth.guard';

const routes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      { path: ':rentalId', component: RentalDetailsComponent, canActivate: [AuthGuard] }
    ]
  }
]


@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    NgPipesModule,
    MapModule
  ],
  providers: [RentalService, AuthGuard]
})

export class RentalModule { }