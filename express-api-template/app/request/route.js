const express = require('express')
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const {index, show, showing} = require('./controller')

router.get('/services', requireToken, index)
router.get('/services/:id', requireToken, show)
router.get('/services/:sid/customers/:cid', requireToken, showing)



module.exports = router