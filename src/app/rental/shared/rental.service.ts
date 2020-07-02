import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class RentalService {
  private rentals: any[] = [{
    id: 1,
    title: "Malaika APartment",
    city: "Nairobi",
    street: "Shikunga road",
    category: "Apartment",
    image: "http://via.placeholder.com/360x250",
    bedrooms: 1,
    description: "Walking distance to CBD",
    dailyRate: "KSH 2000",
    shared: false,
    createdAt: "1/7/2020"
  },
  {
    id: 2,
    title: "Tazamana Court",
    city: "Nakuru",
    street: "Milimani road",
    category: "Apartment",
    image: "http://via.placeholder.com/360x250",
    bedrooms: 3,
    description: "Walking distance to naivas",
    dailyRate: "KSH 2500",
    shared: true,
    createdAt: "1/7/2020"
  },
  {
    id: 3,
    title: "Maobasa Raha Resort",
    city: "Mombasa",
    street: "Mombasa road",
    category: "Hotel",
    image: "http://via.placeholder.com/360x250",
    bedrooms: 1,
    description: "Beautiful beach view",
    dailyRate: "KSH 4000",
    shared: false,
    createdAt: "2/7/2020"
  },
  {
    id: 4,
    title: "Ole Sereni APartment",
    city: "Maasai Mara",
    street: "Narok road",
    category: "Hotel",
    image: "http://via.placeholder.com/360x250",
    bedrooms: 1,
    description: "Live in the wilderness",
    dailyRate: "KSH 2000",
    shared: true,
    createdAt: "2/7/2020"
  }]

  public getRentals(): any {
    const rentalObservable = new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.rentals)
      }, 1000);

      setTimeout(() => {
        observer.error('BAD ERROR')
      }, 2000);

      setTimeout(() => {
        observer.complete()
      }, 3000);
    })

    return rentalObservable;
  }
}