import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalDetailsBookingComponent } from './rental-details-booking.component';

describe('RentalDetailsBookingComponent', () => {
  let component: RentalDetailsBookingComponent;
  let fixture: ComponentFixture<RentalDetailsBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalDetailsBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalDetailsBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
