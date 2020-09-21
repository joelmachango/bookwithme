const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Booking Model
const bookingSchema = new Schema({
  startAt: {
    type: Date,
    required: 'Starting Date is required'
  },
  endAt: {
    type: Date,
    required: 'Ending Date is required'
  },
  totalPrice: {
    type: Number
  },
  days: {
    type: Number
  },
  guests: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rental: { type: Schema.Types.ObjectId, ref: 'Rental' }
})


module.exports = mongoose.model('Booking', bookingSchema)