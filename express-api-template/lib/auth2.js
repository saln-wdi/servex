const passport = require('passport')
const bearer = require('passport-http-bearer')
const Customer = require('../app/customer/model')
const User = require('../app/models/user')
const strategy = new bearer.Strategy(
  function (token, done) {
    User.findOne({ token: token }, function (err, customer) {
      if (err) { return done(err) }
      return done(null, customer, { scope: 'all' })
    })
  }
)

const strategy2 = new bearer.Strategy(
  function (token, done) {
    Customer.findOne({ token: token }, function (err, customer) {
      if (err) { return done(err) }
      return done(null, customer, { scope: 'all' })
    })
  }
)
 
passport.serializeUser((customer, done) => {
  done(null, customer)
})

passport.deserializeUser((customer, done) => {
  done(null, customer)
})

module.exports = {passport, strategy, strategy2}
