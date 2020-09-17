const Booking = require('../models/booking')
const Rental = require('../models/rental')
const { normalizeErrors } = require('../helpers/mongoose')

exports.createBooking = function (req, res) {
  const { startAt, endAt, totalPrice, guest, days, rental } = req.body
  const user = res.locals.user

  const booking = new Booking({ startAt, endAt, totalPrice, guest, days })

  Rental.findById(rental._id)
    .populate('bookings')
    .populate('user')
    .exec(function (err, foundRental) {

      if (err) {
        return res.status(422).send({
          errors: normalizeErrors(error.errors)
        })
      }

      if (foundRental.user.id === user.id) {
        return res.status(422).send({ errors: [{ title: 'Invalid User', details: 'Cannot book your own rental;' }] })
      }
      // Check for valid booking
      return res.json({ booking, foundRental })
    })

  // res.json({ 'createBooking': 'ok' })
}