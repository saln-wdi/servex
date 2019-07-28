const customErrors = require('../../lib/custom_errors');
const handle404 = customErrors.handle404;

const User = require('../models/user')
const Category = require('./model')
const Service = require('../service/model')


const index = (req, res, next) => {
    const userId = req.user.id
    Category.find({user: userId})
    .then(handle404)
    .then(categories => res.status(200).json({categories}))
    .catch(next)
}


const show = (req, res, next) => {
    const userId = req.user.id
    const categoryId = req.params.id
    Category.find({_id: categoryId, user: userId})
    .then(handle404)
    .then(category => res.status(200).json({category}))
    .catch(next)
}

const destroy = (req, res, next) => {
    const userId = req.user.id
    const categoryId = req.params.id
    Category.remove({_id: categoryId, user: userId})
    .then(handle404)
    .then(removedCategory => User.update({_id: userId}, {$pull: {categories: categoryId}})
    .then(removedCategoryInUser => Service.deleteMany({category: categoryId})
    .then(removedServicesOfCategory => res.status(201).json())
    .catch(next)
    )
    .catch(next)
    )
    .catch(next)
}


const update = (req, res, next) => {
    const userId = req.user.id
    const CategoryId = req.params.id
    Category.update({_id: req.params.id, user: req.user.id}, {$set: {name: req.body.category.name}})
    .then(updatedCategory => res.status(201).json())
    .catch(next)    
}



const create = (req, res, next) => {
    const userId = req.user.id
    User.findById(userId)
    .then(handle404)
    .then(
        user => {
            req.body.category.user = userId
            Category.create(req.body.category)
            .then(category => User.update({_id: userId}, {$push: {categories: category._id}})
            .then(createCategoryInUser => res.status(201).json())
            .catch(next)
            )
            .catch(next)
        }
    )
    .catch(next)
}



module.exports = {index, show, destroy, update, create}