const mongoose = require('mongoose')



const customerSchema = new mongoose.Schema
(
  {
    name: 
    {
        type: String,
        required: true
    },
    email: 
    {
          type: String,
          required: true,
          unique: true
    }, 
    phone:
    {
        type: String,
        required: true,
        unique: true
    },
    address:
    {
      city:
      {
        type: String,
        required: true
      },
      district:
      {
        type: String,
        required: true
      }
    },
    requests: [{type: mongoose.Schema.Types.ObjectId, ref:'Request'}],
    hashedPassword: 
    {
      type: String,
      required: true
    },
    token: String
  }, 
  {
    timestamps: true,
    toObject: 
    {
      transform: (_doc, customer) => 
      {
        delete customer.hashedPassword
        return customer
      }
    }
  }
)

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer