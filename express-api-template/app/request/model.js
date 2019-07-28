const mongoose = require('mongoose')



const requestSchema = new mongoose.Schema(
    {
        service:
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Service',
          
        },
        user:
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'User',
          
        },
        date: 
        {
            type: Date,
            required: true
        },
        owner: 
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Custmoer'
        },
        status:
        {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Request_ = mongoose.model('Request', requestSchema);

module.exports = Request_