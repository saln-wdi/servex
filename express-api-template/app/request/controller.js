const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const Request_ = require('./model')
const User = require('../models/user')
const Service = require('../service/model')
const Customer = require('../customer/model')

const index = (req, res, next) => {
    Request_.find({user: req.user.id})
    .then(handle404)
    .then(
        requests => {
            const filteringRequests = requests.map(request => request.service)
            Service.find({_id: {$in: filteringRequests}})
            .then(handle404)
            .then(
                services => {
                    const filteringServices = services.map(service=>
                        {
                            return {service: service.name, id: service.id}
                        }
                    )
                    res.status(200).json({services: filteringServices})
                }
            )
            .catch(next)
        }
    )
    .catch(next)
}


const show = (req, res, next) => {
    Request_.find({service: req.params.id})
    .then(handle404)
    .then(
        requests => {
            const filteringRequest = requests.map(request=> request.owner)
            Customer.find({_id: {$in: filteringRequest}})
            .then(handle404)
            .then(
                customers => {
                    const filteringCustomers = customers.map(customer=>{
                        return {customer: customer.name, id: customer._id, }
                    })
                    res.status(200).json({customers: filteringCustomers})
                }
                
            )
            .catch(next)
       }
    )
    .catch(next)
}


const showing = (req, res, next) => {
    Request_.find({owner: req.params.cid, service: req.params.sid})
    .then(handle404)
    .then(requests => {
        const filteringRequests = requests.map(request => {
            return {date: request.date.toDateString(), description: request.description, id: request.id, status: request.status}
        })
        res.status(200).json({requests: filteringRequests})
    }
        )
    .catch(next)
}

const update = (req, res, next) => {
    Request_.update({_id: req.params.rid}, {$set: {status: req.body.status}})
    .then(
        request => {
            res.status(200).json({request})
        }
    )
    .catch(next)
}

const find = (req, res, next) => {
    Request_.findById(req.params.rid)
    .then(handle404)
    .then(
        request => {
            Customer.findById(req.params.cid)
            .then(handle404)
            .then(
                customer => {
                    const filteringCustomer = {name: customer.name, phone: customer.phone, address: customer.address, email: customer.email, }
                    res.json({customer: filteringCustomer, date: request.date.toDateString(), description: request.description, status: request.status})
                }
            )
            .catch(next)
        }
    )
    .catch(next)
}


module.exports = {index, show, showing, update, find}