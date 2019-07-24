//////////////require//////////////
const express = require('express');
const router = express.Router();
const passport = require('passport');
const customErrors = require('../../lib/custom_errors');
const handle404 = customErrors.handle404;
// const requireToken = passport.authenticate('bearer', { session: false });



//////////////models////////////////
const Request_ = require('../models/request_service');
const Customer = require('../models/customer')
const Categroy = require('../models/categroy')
const Service = require('../models/service')
const User = require('../models/user')

////////////////////////////////////CRUD////////////////////////////////////////////////

//////////////index/////////////////
const index = (req, res, next) => Categroy.find()
    .then( categories => res.status(200).json({categories}))
    .catch(next)


router.get('/', index);
//////////////show/////////////////
const show = (req, res, next) => {
    Service.find({category: req.params.id})
    .then(
        services => res.status(200).json({services})
    )
    .catch(next)
}

router.get('/:cid', show);

//////////////destroy/////////////////
const destroy = (req, res, next) => {}


//////////////update/////////////////
const update = (req, res, next) => {}


//////////////create/////////////////
const create = (req, res, next) => {
    const id = req.params.sid;
    Service.find({_id: id})
    .then(handle404)
    .then( service => {
    const newRequest = new Request_(req.body.request);
    newRequest.service = id;
    newRequest.save()
    .then( request => {
         const newCustomer = new Customer(req.body.customer)
         newCustomer.request = request._id;
         newCustomer.save()
         .then(customer => {
             Request_.update({_id: request._id}, {$set :{owner: customer._id}})
             .then(updateProcessing => {
                 Categroy.find({_id: req.params.cid})
                 .then(handle404)
                 .then(category => {
                     User.update({_id: category[0].user}, {$push: {servicesLog: request._id}})
                     .then(updateProcess => res.status(201).json(
                         {request, 
                            category,
                            customer, 
                            updateProcessing, 
                            updateProcess}))
                     .catch(next)
                 })
                 .catch(next)
             })
             .catch(next)
         })
         .catch(next)
    }
    )
    .catch()
    })

}


router.post('/:cid/:sid/servex', create);



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