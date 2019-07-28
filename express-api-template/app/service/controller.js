const customErrors = require('../../lib/custom_errors');
const handle404 = customErrors.handle404;

//////////////models////////////////
const Category = require('../category/model');
const Service = require('./model')
const User = require('../models/user')



const index = (req, res, next) => {
    const userId = req.user.id
    const categoryId = req.params.id
    Category.find({_id: categoryId, user: userId})
    .then(handle404)
    .then(category => Service.find({category: categoryId})
    .then(handle404)
    .then(services => res.status(200).json({services}))
    .catch(next)
    )
    .catch(next)
}


const show = (req, res, next) => {
    const userId = req.user.id
    const categoryId = req.params.cid
    const serviceId = req.params.sid
    Category.find({_id: categoryId, user: userId})
    .then(handle404)
    .then(category => Service.find({_id: serviceId, category: categoryId})
    .then(handle404)
    .then(
        service => res.status(200).json({service})
    )
    .catch(next)
    )
    .catch(next)
}


const destroy = (req, res, next) => {
    const userId = req.user.id
    const categoryId = req.params.cid
    const serviceId = req.params.sid
    Category.find({_id: categoryId, user: userId})
    .then(handle404)
    .then(category => Category.update({_id: categoryId}, {$pull: {services: serviceId}})
    .then(removedServiceInCategory => Service.remove({_id: serviceId})
    .then(removedService => res.status(201).json())
    .catch(next)
    )
    .catch(next)
    )
    .catch(next)
}



const update = (req, res, next) => {
    const userId = req.user.id
    const categoryId = req.params.cid
    const serviceId = req.params.sid
    Category.find({_id: categoryId, user: userId})
    .then(handle404)
    .then(category => Service.update({_id: serviceId, category: categoryId}, 
        {$set: {name: req.body.service.name, description: req.body.service.description}})
    .then(updatedService => res.status(201).json())
    .catch(next)
    )
    .catch(next)
}


const create = (req, res, next) => {
    const userId = req.user.id
    const categoryId = req.params.id
    Category.find({_id: categoryId, user: userId})
    .then(handle404)
    .then(
        category => {
            req.body.service.category = categoryId
            Service.create(req.body.service)
            .then(
                service => Category.update({_id: categoryId, user: userId}, 
                    {
                        $push: {services: service._id}
                    })
                    .then(
                        updatedCategory => res.status(200).json({service})
                    )
                    .catch()
            )
            .catch(next)
        }
    )
    .catch(next)
}


module.exports = {index, show, destroy, update, create}