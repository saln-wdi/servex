const mongoose = require('mongoose')


const categroySchema = new mongoose.Schema(
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
        timestamps: true,    
    }
)

const Categroy = mongoose.model('Categroy', categroySchema)

module.exports = Categroy