const User = require('../models/user')
const MongooseHelpers = require('../helpers/mongoose')


exports.auth = function (req, res) {

}

exports.register = function (req, res) {
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.passowrd;
  // const passwordConfirmation = req.body.passwordConfirmation;

  // Destructurizing
  const { username, email, password, passwordConfirmation } = req.body

  if (!email || !password) {
    return res.status(422).send({ errors: [{ title: 'Data missing', details: 'Please provide email and password' }] })
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({ errors: [{ title: 'Invalid Password', details: 'Entered password is not the same as confirmation' }] })
  }

  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) })
    }

    if (existingUser) {
      return res.status(422).send({ errors: [{ title: 'Invalid email', details: 'User with this email already exists' }] })
    }

    const user = new User({
      username,
      email,
      password
    })

    user.save(function (err) {
      if (err) {
        // return res.status(422).send(err)
        return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) })
      }

      return res.json({ 'registered': true })
    })
  })

  // res.json({ username, email, password, passwordConfirmation })
}