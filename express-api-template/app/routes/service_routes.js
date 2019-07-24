//////////////require//////////////
const express = require('express');
const router = express.Router();
const passport = require('passport');
const customErrors = require('../../lib/custom_errors');
const handle404 = customErrors.handle404;
const requireToken = passport.authenticate('bearer', { session: false });



//////////////models////////////////
const Categroy = require('../models/categroy');
const Service = require('../models/service')
const User = require('../models/user')

////////////////////////////////////CRUD////////////////////////////////////////////////

//////////////index/////////////////
const index = (req, res, next) => {
    console.log('dsfdssdfafdaskdklsfalafsdl')
    User.find({_id: req.user.id})
    .then(handle404)
    .then(
        user => {
            Categroy.find({_id: req.params.id})
            .then(handle404)
            .then(
                category => {
                    Service.find({category: req.params.id})
                    .then(handle404)
                    .then(
                        services => {
                            res.status(200).json({services})
                        }
                    )
                    .catch(next)
                }
            )
            .catch(next)
        }
    )
    .catch(next)
}

router.get('/:id/services', requireToken, index);
//////////////show/////////////////
const show = (req, res, next) => {}


//////////////destroy/////////////////
const destroy = (req, res, next) => {}


//////////////update/////////////////
const update = (req, res, next) => {}


//////////////create/////////////////
const create = (req, res, next) => {
    const id = req.params.id;
    Categroy.findById(id)
    .then(handle404)
    .then(categroy => {
        const newService = new Service(req.body.service);
        newService.category = id;
        newService.save()
        .then(service => {
            Categroy.update({_id: id}, {$push: {services: service._id}})
            .then(updateProcessing => res.status(201).json({service, updateProcessing}))
            .catch(next)
        })
        .catch(next)
    })
    .catch(next)
}

router.post('/:id/services', requireToken, create);



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