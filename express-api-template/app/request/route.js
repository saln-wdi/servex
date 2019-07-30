const express = require('express')
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const {index, show, showing, update, find} = require('./controller')

router.get('/services', requireToken, index)
router.get('/services/:id', requireToken, show)
router.get('/services/:sid/customers/:cid', requireToken, showing)
router.post('/services/:sid/customers/:cid/:rid', requireToken, update)
router.get('/:rid/customers/:cid', requireToken, find)

 
module.exports = router