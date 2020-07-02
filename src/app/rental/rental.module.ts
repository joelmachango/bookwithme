import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RentalComponent } from "./rental.component";
import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalService } from './shared/rental.service';


@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
  ],
  imports: [CommonModule],
  providers: [RentalService]
})

export class RentalModule { }