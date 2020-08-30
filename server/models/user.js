const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    min: [4, 'Too short, minimum of 4 characters'],
    nax: [32, 'Too long, maximum is 32 characters']
  },
  email: {
    type: String,
    min: [4, 'Too short, minimum of 4 characters'],
    nax: [32, 'Too long, maximum is 32 characters'],
    required: 'Email is required',
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, 'Too short, minimum of 4 characters'],
    nax: [32, 'Too long, maximum is 32 characters'],
    required: 'Password is required'
  },
  rentals: [{ type: Schema.Types.ObjectId, ref: 'Rental' }]
})

module.exports = mongoose.model('User', userSchema)