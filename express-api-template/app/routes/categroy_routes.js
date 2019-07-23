//////////////require//////////////
const express = require('express');
const router = express.Router();
const passport = require('passport');
const customErrors = require('../../lib/custom_errors');
const handle404 = customErrors.handle404;
const requireToken = passport.authenticate('bearer', { session: false });



//////////////models////////////////
const User = require('../models/user');
const Categroy = require('../models/categroy');


////////////////////////////////////CRUD////////////////////////////////////////////////

//////////////index/////////////////
const index = (req, res, next) => {
    User.find({_id: req.user.id})
    .then(handle404)
    .then(
        user => {
            Categroy.find({user: req.user.id})
            .then(handle404)
            .then(
                categroies => {
                    res.status(200).json({categroies})
                }
            )
            .catch(next)
        }
    )
    .catch(next)
}
router.get('/', requireToken, index)

//////////////show/////////////////
const show = (req, res, next) => {}


//////////////destroy/////////////////
const destroy = (req, res, next) => {}


//////////////update/////////////////
const update = (req, res, next) => {}


//////////////create/////////////////
const create = (req, res, next) => {
    const id = req.user.id;
    User.findById(id)
    .then(handle404)
    .then(user => {
        const newCategroy = new Categroy(req.body.categroy);
        newCategroy.user = id;
        newCategroy.save()
        .then(categroy => {
            User.update({_id: req.user.id}, {$push: {categories: categroy._id}})
            .then(updateProcessing => res.status(201).json({categroy, updateProcessing}))
            .catch(next)
        })
        .catch(next)
    })
    .catch(next)
}

router.post('/', requireToken, create);



////////////////////////////////////exports////////////////////////////////////////////////
module.exports = router;



/*
.then(
        {
            const newCategroy = new Categroy(req.body.categroy);
            User.update(
                {_id: req.user.id},
                {$push: {missing: newCategroy}})
    .then(
        updateProcessing => res.status(201).json(updateProcessing)
    )
    .catch(handle404)
        }
    ) */