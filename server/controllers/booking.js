const moment = require('moment')
const Booking = require('../models/booking')
const Rental = require('../models/rental')
const User = require('../models/user')
const { normalizeErrors } = require('../helpers/mongoose')
const { response } = require('express')

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
        return res.status(422).send({ errors: [{ title: 'Invalid User!', details: 'Cannot book your own rental;' }] })
      }
      // Check for valid booking
      if (isValidBooking(booking, foundRental)) {
        booking.user = user
        booking.rental = foundRental
        foundRental.bookings.push(booking)

        booking.save(function (err) {
          if (err) {
            return res.status(422).send({
              errors: normalizeErrors(error.errors)
            })
          }
          foundRental.save()

          User.update({ _id: user.id }, { $push: { bookings: booking } }, function (err) { console.log(err) })

          return res.json({ startArt: booking.startAt, endAt: booking.endAt })
        })

      } else {
        return res.status(422).send({ errors: [{ title: 'Invalid Booking', details: 'Chossen dates are already taken;' }] })
      }
    })
}

function isValidBooking(proposedBooking, rental) {
  let isValid = true

  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(function (booking) {
      const proposedStart = moment(proposedBooking.startAt)
      const proposedEnd = moment(proposedBooking.endAt)

      const actualStart = moment(booking.startAt)
      const actualEnd = moment(booking.endAt)

      return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart))
    })
  }

  return isValid;
}