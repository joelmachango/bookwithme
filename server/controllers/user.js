exports.auth = function (req, res) {

}

exports.register = function (req, res) {
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.passowrd;
  // const passwordConfirmation = req.body.passwordConfirmation;

  // Destructurization
  const { username, email, password, passwordConfirmation } = req.body

  res.json({ username, email })
}