const User = require('../models/user')
const MongooseHelpers = require('../helpers/mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config/dev')

exports.auth = function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ errors: [{ title: 'Data missing', details: 'Please provide email and password' }] })
  }

  User.findOne({ email }, function (err, user) {
    if (err) {
      return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) })
    }

    if (!user) {
      return res.status(422).send({ errors: [{ title: 'Invalid User', details: 'User does not exist' }] })
    }

    if (user.hasSamePassword(password)) {
      // return JWT tocken

      const token = jwt.sign({
        userId: user.id,
        username: user.username
      }, config.SECRET, { expiresIn: '1h' });

      return res.json(token)

    } else {
      return res.status(422).send({ errors: [{ title: 'Wrong Data', details: 'Please provide correct email and password' }] })
    }

    user.hasSamePassword()
  })
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

exports.authMiddleware = function (req, res, next) {
  const token = req.headers.authorization
  if (token) {
    const user = parseToken(token)

    User.findById(user.userId, function (err, user) {
      if (err) {
        return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) })
      }
      if (user) {
        res.locals.user = user
        next()
      } else {
        return res.status(401).send({ errors: [{ title: 'Not Authorized', details: 'You need to login to get access' }] })
      }
    })
  } else {
    return res.status(401).send({ errors: [{ title: 'Not Authorized', details: 'You need to login to get access' }] })
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], config.SECRET);
}