const Rental = require('./models/rental')
const User = require('./models/user')


class FakeDb {
  constructor() {
    this.rentals = [{
      title: "Nice view on ocean...",
      city: "San Francisco",
      street: "Main street",
      category: "condo",
      image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      bedrooms: 4,
      shared: true,
      description: "Very nice apartment in center of the city.",
      dailyRate: 43
    },
    {
      title: "Modern apartment in center",
      city: "New York",
      street: "Time Square",
      category: "apartment",
      image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      bedrooms: 1,
      shared: false,
      description: "Very nice apartment in center of the city.",
      dailyRate: 11
    },
    {
      title: "Old house in nature",
      city: "Spisska Nova Ves",
      street: "Banicka 1",
      category: "house",
      image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      bedrooms: 5,
      shared: true,
      description: "Very nice apartment in center of the city.",
      dailyRate: 23
    }];

    this.users = [{
      username: "Joel Machango",
      email: "joel@tazamana.com",
      password: "test123"
    }, {
      username: "Shirleen Ogola",
      email: "ogola@tazamna.com",
      password: "test1234"
    }];
  }

  // remove rentals from DB b4 creating new once
  async cleanDB() {
    await User.deleteMany({})
    await Rental.deleteMany({});
  }

  pushDataToDb() {
    const user = new User(this.users[0])
    const user1 = new User(this.users[1])


    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.user = user

      user.rentals.push(newRental)
      newRental.save();
    })
    user.save()
    user1.save()

  }

  async seedDb() {
    await this.cleanDB();
    await this.pushDataToDb()
  }
}

module.exports = FakeDb;