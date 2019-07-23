const mongoose = require('mongoose')



const customerSchema = new mongoose.Schema(
    {
        name: 
        {
            type: String,
            required: true
        },
        email: 
        {
             type: String,
             required: true
        }, 
        phone:
        {
            type: String,
            required: true
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
            request: {type: mongoose.Schema.Types.ObjectId, ref:'Request'},
            
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer