import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat: number = -1.3031934;
  lng: number = 36.5672003;

  constructor() { }

  ngOnInit() {
  }

}
