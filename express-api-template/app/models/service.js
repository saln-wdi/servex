const mongoose = require('mongoose')


const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description:
        {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Category'
        }
    },
    
    {
        timestamps: true,
    }
)


const Service = mongoose.model('Service', serviceSchema)

module.exports = Service