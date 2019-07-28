//////////////require//////////////
const express = require('express');
const router = express.Router();
const passport = require('passport');
const requireToken = passport.authenticate('bearer', { session: false });
const {index, show, destroy, update, create} = require('./controller')
 



////////////////////////////////////CRUD////////////////////////////////////////////////

router.get('/:id/services', requireToken, index);
router.get('/:cid/services/:sid', requireToken, show);
router.delete('/:cid/services/:sid', requireToken, destroy);
router.put('/:cid/services/:sid', requireToken, update);
router.post('/:id/services', requireToken, create);



////////////////////////////////////exports////////////////////////////////////////////////
module.exports = router