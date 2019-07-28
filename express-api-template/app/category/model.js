const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
            unique: true
        },
        services: [{type: mongoose.Schema.Types.ObjectId, ref: 'Service'}],
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        }

    },
    {
        timestamps: true   
    }
)

const Category = mongoose.model('Category', categorySchema)

module.exports = Category