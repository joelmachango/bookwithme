const Rental = require('./models/rental')
const User = require('./models/user')
const Booking = require('./models/booking')

const fakeDBData = require('./data.json')


class FakeDb {
  constructor() {
    this.rentals = fakeDBData.rentals;

    this.users = fakeDBData.users;
  }

  // remove rentals from DB b4 creating new once
  async cleanDB() {
    await User.deleteMany({})
    await Rental.deleteMany({});
    await Booking.deleteMany({});;
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