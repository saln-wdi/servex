const express = require('express')
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const {create, enter, update, destroy, index, indexing, show, showing} = require('./controller')

router.post('/sign-up', create)
router.post('/sign-in', enter)
router.patch('/change-password', requireToken, update)
router.delete('/sign-out', requireToken, destroy)
router.get('/users', requireToken, index)
router.get('/users/:id', requireToken, show)
router.get('/users/:uid/categories/:cid', requireToken, showing)
router.post('/users/:uid/categories/:cid/services/:sid', requireToken, indexing)

module.exports = router