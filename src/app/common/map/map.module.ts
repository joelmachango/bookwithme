import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAi923SAA3UUjjlIUaESewMsV5sJnwL240'
    })
  ],
  exports: [
    MapComponent
  ],
  declarations: [
    MapComponent
  ]
})
export class MapModule { }
