const crypto = require('crypto')
const bcrypt = require('bcrypt')
const errors = require('../../lib/custom_errors')
const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

const customErrors = require('../../lib/custom_errors');
const handle404 = customErrors.handle404;

const Customer = require('./model')
const User = require('../models/user')
const Category = require('../category/model')
const Service = require('../service/model')
const Request_ = require('../request/model')

const create = (req, res, next) => {
    Promise.resolve(req.body.credentials)
      .then(credentials => {
        if (!credentials ||
            !credentials.password ||
            credentials.password !== credentials.password_confirmation) {
          throw new BadParamsError()
        }
      })
      .then(() => bcrypt.hash(req.body.credentials.password, 10))
      .then(hash => {
        return {
          email: req.body.credentials.email,
          name: req.body.credentials.name,
          phone: req.body.credentials.phone,
          address: req.body.credentials.address,
          hashedPassword: hash
        }
      })
      .then(customer => Customer.create(customer))
      .then(customer => res.status(201).json({ customer: customer.toObject() }))
      .catch(next)
}


const enter = (req, res, next) => {
  const pw = req.body.credentials.password
  let customer
  Customer.findOne({ email: req.body.credentials.email })
    .then(record => {
      if (!record) {
        throw new BadCredentialsError()
      }
      customer = record
      return bcrypt.compare(pw, customer.hashedPassword)
    })
    .then(correctPassword => {
      if (correctPassword) {
        const token = crypto.randomBytes(16).toString('hex')
        customer.token = token
        return customer.save()
      } else {
        throw new BadCredentialsError()
      }
    })
    .then(customer => {
      res.status(201).json({ customer: customer.toObject() })
    })
    .catch(next)
}


const update = (req, res, next) => {
  let customer
  customer.findById(req.customer.id)
    .then(record => { customer = record })
    .then(() => bcrypt.compare(req.body.passwords.old, customer.hashedPassword))
    .then(correctPassword => {
      if (!req.body.passwords.new || !correctPassword) {
        throw new BadParamsError()
      }
    })
    .then(() => bcrypt.hash(req.body.passwords.new, 10))
    .then(hash => {
      customer.hashedPassword = hash
      return customer.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}


const destroy = (req, res, next) => {
  req.customer.token = crypto.randomBytes(16)
  req.customer.save()
    .then(() => res.sendStatus(204))
    .catch(next)
}


const show = (req, res, next) => {
  console.log(req.params.id)
  Category.find({user: req.params.id})
  .then(handle404)
  .then(categories => {
    const filteringCategories = categories.map(category => {
      const object = {category: category.name, id: category._id}
      return object
    })
    res.status(200).json({categories: filteringCategories})
  })
  .catch(next)
}

const index = (req, res, next) => {
  User.find()
  .then(
     users => {
       const filteringUsers = users.map(user => {
         const object = {user: user.name, id: user._id}
         return object
       })
       res.status(200).json({users: filteringUsers})
     }
  )
  .catch(next)
}


const showing = (req, res, next) => {
  Service.find({category: req.params.cid})
  .then(handle404)
  .then(services => {
    const filteringServices = services.map(service => {
      const object = {service: service.name, description: service.description, id: service._id}
      return object
    })
    res.status(200).json({services: filteringServices})
  })
  .catch(next)
}

const indexing = (req, res, next) => {
  req.body.request.owner = req.user.id
  req.body.request.service = req.params.sid
  req.body.request.user = req.params.uid
  Request_.create(req.body.request)
  .then(
    request => {
      Customer.update({_id: req.user.id}, {$push: {requests: request._id}})
      .then(
        createRequestInCustomer => {
          User.update({_id: req.params.uid}, {$push: {servicesLog: request._id}})
          .then(
            createRequestInUser => res.status(201).json({request, createRequestInCustomer, createRequestInUser})
          )
          .catch(next)
        }
      )
      .catch(next)
    }
  )
  .catch(next)
}

const findAll = (req, res, next) => {
  Request_.find({owner: req.user.id})
  .then(handle404)
  .then(
    requests => {
      const filteringRequests = requests.map(request => request.service)
      Service.find({_id: {$in: filteringRequests}})
      .then(handle404)
      .then(
        services => {
          const filteringServices = services.map(service=> {
            return {name: service.name, description: service.description, id: service._id}
          })
          res.status(200).json({services: filteringServices})
        }
      )
      .catch(next)
      
    }
  )
  .catch(next)
}


const find = (req, res, next) => {
  Request_.find({owner: req.user.id, service: req.params.id})
  .then(handle404)
  .then(
    requests => {
      const filteringRequests = requests.map(request => {
        return {date: request.date.toDateString(), description: request.description, status: request.status, id: request._id}
      })
      res.status(200).json({requests: filteringRequests})
    }
  )
  .catch(next)
}

module.exports = {create, enter, update, destroy, index, indexing, show, showing, findAll, find}