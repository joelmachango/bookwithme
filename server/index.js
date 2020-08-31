const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const config = require('./config/dev');
const FakeDB = require('./fake.db')
const Rental = require('./models/rental')

const rentalRoutes = require('./routes/rentals')
const userRoutes = require('./routes/users')


mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  const fakeDB = new FakeDB
  // fakeDB.seedDb()
})

const app = express()
app.use(bodyParser.json())


app.use('/api/v1/rentals', rentalRoutes)
app.use('/api/v1/users', userRoutes)


app.get('/rentals', function (req, res) {
  res.json({ 'success': true })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log('I am running!')
})

