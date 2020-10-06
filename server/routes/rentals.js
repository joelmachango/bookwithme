const express = require('express')
const router = express.Router();
const Rental = require('../models/rental')
const UserCtrl = require('../controllers/user')

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
    return res.json({ city })
  } else {
    Rental.find({})
      .select('-bookings')
      .exec(function (err, foundRentals) {
        return res.json(foundRentals)
      });
  }
});



module.exports = router;