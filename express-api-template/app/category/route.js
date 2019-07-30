//////////////require//////////////
const express = require('express');
const router = express.Router();
const passport = require('passport');
const requireToken = passport.authenticate('bearer', { session: false });
const {index, show, destroy, update, create} = require('./controller')
 
router.get('/', requireToken, index)
router.get('/:id', requireToken, show);
router.delete('/:id', requireToken, destroy);
router.put('/:id', requireToken, update);
router.post('/', requireToken, create);
module.exports = router;

