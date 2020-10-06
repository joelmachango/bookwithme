const express = require('express')
const router = express.Router();
const Rental = require('../models/rental')
const UserCtrl = require('../controllers/user');
const { json } = require('body-parser');
const { normalizeErrors } = require('../helpers/mongoose')


router.get('/secret', UserCtrl.authMiddleware, function (req, res) {
  res.json({ "secret": true })
})

router.get('/:id', function (req, res) {
  const rentalId = req.params.id;
  Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function (err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: [{ title: 'Rental error!', details: 'Could not find rental' }] })
      }
      return res.json(foundRental)
    })
});

router.get('', function (req, res) {
  const city = req.query.city;

  if (city) {
    Rental
      .find({ city: city.toLowerCase() })
      .select('-bookings')
      .exec(function (err, filteredRentals) {
        if (err) {
          return res.status(422).send({
            errors: normalizeErrors(error.errors)
          })
        }
        if (filteredRentals.length === 0) {
          return res.status(422).send({ errors: [{ title: 'No Rentals Found!', details: `There are no rentals for city ${city}` }] })
        }
        return res.json(filteredRentals)
      })
    return json({ city })
  } else {
    Rental.find({})
      .select('-bookings')
      .exec(function (err, foundRentals) {
        return res.json(foundRentals)
      });
  }
});



module.exports = router;